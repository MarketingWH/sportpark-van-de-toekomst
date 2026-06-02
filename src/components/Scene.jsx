import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  OrbitControls,
  RoundedBox,
  Sky,
} from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import styles from './Scene.module.css';
import Hotspot from './Hotspot';
import ImportedModel from './ImportedModel';
import { modelConfig } from '../data/modelConfig';
import { overviewCamera } from '../data/products';

const canalRoute = [
  [-44, 0, 31],
  [-27, 0, 24],
  [-10, 0, 12],
  [-9, 0, -3],
  [-19, 0, -21],
  [-10, 0, -48],
];

const mainPathRoute = [
  [52, 0, 18],
  [38, 0, 18],
  [26, 0, 16],
  [14, 0, 12],
  [4, 0, 8],
  [-5, 0, -1],
  [-8, 0, -18],
  [-5, 0, -35],
];

const watersideRoute = [
  [20, 0, 27],
  [10, 0, 20],
  [-4, 0, 15],
  [-17, 0, 8],
  [-26, 0, -1],
  [-28, 0, -17],
];

const clubLoopRoute = [
  [3, 0, 7],
  [11, 0, 7],
  [19, 0, 12],
  [27, 0, 12],
  [34, 0, 7],
];

const deckRoute = [
  [-18, 0, -25],
  [-13, 0, -20],
  [-8, 0, -14],
];

const treeLayout = [
  [-50, 0, 44, 1.18],
  [-36, 0, 42, 1.02],
  [-18, 0, 39, 0.92],
  [4, 0, 37, 1.08],
  [24, 0, 33, 0.9],
  [40, 0, 29, 1.04],
  [56, 0, 26, 1.1],
  [58, 0, -10, 1.02],
  [44, 0, -24, 0.94],
  [32, 0, -42, 1.05],
  [14, 0, -45, 1.08],
  [-11, 0, -40, 0.94],
  [-29, 0, -36, 1.14],
  [-48, 0, -18, 0.9],
  [-47, 0, 9, 1.02],
  [-24, 0, 0, 0.84],
  [16, 0, -8, 0.88],
  [27, 0, -12, 0.8],
  [39, 0, 10, 0.84],
  [50, 0, 6, 0.82],
];

const shrubLayout = [
  [-28, 0, 18, 3.1],
  [-16, 0, 11, 2.3],
  [-22, 0, -4, 2.4],
  [-13, 0, -18, 2.8],
  [-4, 0, 18, 1.9],
  [6, 0, 19, 2.2],
  [14, 0, 20, 1.6],
  [21, 0, 21, 1.7],
  [28, 0, 16, 1.8],
  [37, 0, 24, 2.2],
  [47, 0, 18, 2.3],
  [49, 0, 6, 1.8],
  [31, 0, -9, 1.7],
  [22, 0, -21, 2.3],
  [7, 0, -30, 2.2],
  [-2, 0, -22, 2.4],
  [-17, 0, -28, 1.9],
];

const backdropTreeLayout = Array.from({ length: 20 }, (_, index) => {
  const x = -72 + index * 7.4;
  const z = 44 + Math.sin(index * 0.55) * 2.8;
  const scale = 0.94 + (index % 4) * 0.08;
  return [x, 0, z, scale];
}).concat(
  Array.from({ length: 22 }, (_, index) => {
    const x = -76 + index * 7;
    const z = 54 + Math.cos(index * 0.45) * 2.3;
    const scale = 1.02 + (index % 5) * 0.07;
    return [x, 0, z, scale];
  }),
);

function curveFrom(points) {
  return new THREE.CatmullRomCurve3(
    points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,
    'catmullrom',
    0.48,
  );
}

function ribbonGeometry(points, width, samples = 84) {
  const sampled = curveFrom(points).getPoints(samples);
  const left = [];
  const right = [];

  sampled.forEach((point, index) => {
    const previous = sampled[Math.max(index - 1, 0)];
    const next = sampled[Math.min(index + 1, sampled.length - 1)];
    const tangent = new THREE.Vector3().subVectors(next, previous).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).multiplyScalar(width / 2);
    left.push(new THREE.Vector2(point.x + normal.x, point.z + normal.z));
    right.push(new THREE.Vector2(point.x - normal.x, point.z - normal.z));
  });

  const shape = new THREE.Shape();
  shape.moveTo(left[0].x, left[0].y);
  left.slice(1).forEach((point) => shape.lineTo(point.x, point.y));
  right
    .slice()
    .reverse()
    .forEach((point) => shape.lineTo(point.x, point.y));
  shape.closePath();

  const geometry = new THREE.ShapeGeometry(shape, 80);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function offsetSegments(points, offset, color, height, depth, side = 1, samples = 84) {
  const sampled = curveFrom(points).getPoints(samples);

  return sampled.slice(0, -1).map((point, index) => {
    const next = sampled[index + 1];
    const direction = new THREE.Vector3().subVectors(next, point);
    const length = direction.length();
    const tangent = direction.clone().normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).multiplyScalar(offset * side);
    const midpoint = new THREE.Vector3().addVectors(point, next).multiplyScalar(0.5).add(normal);

    return {
      key: `${index}-${offset}-${side}`,
      color,
      height,
      depth,
      length,
      position: [midpoint.x, height / 2, midpoint.z],
      rotation: [0, Math.atan2(direction.x, direction.z), 0],
    };
  });
}

function RibbonSurface({
  color,
  opacity = 1,
  points,
  roughness = 0.9,
  transparent = false,
  width,
  y = 0.03,
  metalness = 0.04,
}) {
  const geometry = useMemo(() => ribbonGeometry(points, width), [points, width]);

  return (
    <mesh geometry={geometry} position={[0, y, 0]} receiveShadow>
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        opacity={opacity}
        roughness={roughness}
        transparent={transparent}
      />
    </mesh>
  );
}

function WaterSystem() {
  const highlightRef = useRef(null);
  const highlightGeometry = useMemo(() => ribbonGeometry(canalRoute, 5.2), []);
  const damWallSegments = useMemo(
    () => offsetSegments(canalRoute, 6.05, '#6e808a', 1.9, 0.34, -1, 42).slice(0, 18),
    [],
  );
  const bankSegments = useMemo(
    () => offsetSegments(canalRoute, 5.8, '#977455', 1.05, 0.22, 1, 42).slice(10, 34),
    [],
  );

  useFrame((state) => {
    if (highlightRef.current) {
      highlightRef.current.material.opacity =
        0.18 + Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
    }
  });

  return (
    <group>
      <RibbonSurface color="#476e6a" points={canalRoute} width={13.8} y={-0.03} />
      <RibbonSurface
        color="#4f91a3"
        metalness={0.16}
        points={canalRoute}
        roughness={0.18}
        width={11.7}
        y={0.03}
      />
      <mesh
        ref={highlightRef}
        geometry={highlightGeometry}
        position={[0, 0.12, 0]}
        rotation={[0, 0.04, 0]}
      >
        <meshStandardMaterial
          color="#cde8eb"
          metalness={0.1}
          opacity={0.18}
          roughness={0.05}
          transparent
        />
      </mesh>

      {damWallSegments.map((segment) => (
        <mesh
          key={segment.key}
          castShadow
          receiveShadow
          position={segment.position}
          rotation={segment.rotation}
        >
          <boxGeometry args={[segment.depth, segment.height, segment.length + 0.05]} />
          <meshStandardMaterial color={segment.color} roughness={0.84} />
        </mesh>
      ))}

      {bankSegments.map((segment) => (
        <mesh
          key={segment.key}
          castShadow
          receiveShadow
          position={segment.position}
          rotation={segment.rotation}
        >
          <boxGeometry args={[segment.depth, segment.height, segment.length + 0.03]} />
          <meshStandardMaterial color={segment.color} roughness={0.92} />
        </mesh>
      ))}

      {[
        [-18, 0.02, 8],
        [-8, 0.02, 10],
        [-15, 0.02, -8],
        [-21, 0.02, -28],
      ].map((reed) => (
        <ReedCluster key={reed.join('-')} position={reed} />
      ))}
    </group>
  );
}

function PathNetwork() {
  return (
    <group>
      <RibbonSurface color="#d8cfbb" points={mainPathRoute} width={4.7} y={0.04} />
      <RibbonSurface color="#d2c7b1" points={watersideRoute} width={3.8} y={0.035} />
      <RibbonSurface color="#d9d0bc" points={clubLoopRoute} width={3.3} y={0.035} />
      <RibbonSurface color="#a88f72" points={deckRoute} width={1.8} y={0.04} />
    </group>
  );
}

function GroundPlane() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <planeGeometry args={[190, 190]} />
        <meshStandardMaterial color="#6b7f55" roughness={1} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[14, -0.05, -10]}>
        <planeGeometry args={[152, 152]} />
        <meshStandardMaterial color="#758963" roughness={1} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[38, -0.025, 28]}>
        <circleGeometry args={[11, 34]} />
        <meshStandardMaterial color="#8ca181" roughness={1} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-29, -0.03, -28]}>
        <circleGeometry args={[15, 34]} />
        <meshStandardMaterial color="#7d936d" roughness={1} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[6, -0.02, 30]}>
        <circleGeometry args={[8.6, 30]} />
        <meshStandardMaterial color="#6b856e" roughness={1} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-42, 0.01, -42]}>
        <circleGeometry args={[10.8, 30]} />
        <meshStandardMaterial color="#89a18a" roughness={1} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-34, 0.01, -31]}>
        <circleGeometry args={[7.2, 30]} />
        <meshStandardMaterial color="#c3b188" roughness={1} />
      </mesh>
    </group>
  );
}

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.18, 0.28, 2.56, 10]} />
        <meshStandardMaterial color="#72523c" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[0, 2.72, 0]}>
        <sphereGeometry args={[1.12, 18, 18]} />
        <meshStandardMaterial color="#4f7346" roughness={0.96} />
      </mesh>
      <mesh castShadow position={[0.5, 2.36, 0.34]}>
        <sphereGeometry args={[0.82, 16, 16]} />
        <meshStandardMaterial color="#6c8853" roughness={0.95} />
      </mesh>
      <mesh castShadow position={[-0.48, 2.18, -0.2]}>
        <sphereGeometry args={[0.72, 16, 16]} />
        <meshStandardMaterial color="#41613a" roughness={0.96} />
      </mesh>
    </group>
  );
}

function BackdropTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.14, 0.2, 2.4, 8]} />
        <meshStandardMaterial color="#5e4a39" roughness={0.98} />
      </mesh>
      <mesh castShadow position={[0, 2.7, 0]}>
        <sphereGeometry args={[1.35, 12, 12]} />
        <meshStandardMaterial color="#31453c" roughness={0.98} />
      </mesh>
      <mesh castShadow position={[0.35, 2.35, 0.18]}>
        <sphereGeometry args={[0.88, 10, 10]} />
        <meshStandardMaterial color="#425847" roughness={0.98} />
      </mesh>
      <mesh castShadow position={[-0.42, 2.18, -0.16]}>
        <sphereGeometry args={[0.82, 10, 10]} />
        <meshStandardMaterial color="#273a32" roughness={0.99} />
      </mesh>
    </group>
  );
}

function ShrubMass({ position, scale = 2 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.42, 12, 12]} />
        <meshStandardMaterial color="#637f4d" roughness={0.96} />
      </mesh>
      <mesh castShadow position={[0.34, 0.28, 0.22]}>
        <sphereGeometry args={[0.26, 12, 12]} />
        <meshStandardMaterial color="#7b985d" roughness={0.96} />
      </mesh>
      <mesh castShadow position={[-0.3, 0.26, -0.16]}>
        <sphereGeometry args={[0.24, 12, 12]} />
        <meshStandardMaterial color="#4e6a41" roughness={0.96} />
      </mesh>
    </group>
  );
}

function ReedCluster({ position }) {
  return (
    <group position={position}>
      {[-0.48, -0.2, 0.06, 0.3, 0.55].map((offset, index) => (
        <mesh
          key={`${position[0]}-${position[2]}-${index}`}
          castShadow
          position={[offset, 0.55 + index * 0.06, (index % 2) * 0.18]}
          rotation={[0.05 * index, 0, -0.05 + index * 0.02]}
        >
          <cylinderGeometry args={[0.03, 0.04, 1.1 + index * 0.08, 6]} />
          <meshStandardMaterial color="#929f67" roughness={0.98} />
        </mesh>
      ))}
    </group>
  );
}

function LightMast({ position, height = 11.5 }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.09, 0.11, height, 8]} />
        <meshStandardMaterial color="#aab1a7" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, height - 0.6, 0]}>
        <boxGeometry args={[1.2, 0.16, 0.44]} />
        <meshStandardMaterial
          color="#e7e4d7"
          emissive="#f5e7b4"
          emissiveIntensity={0.24}
          roughness={0.36}
        />
      </mesh>
    </group>
  );
}

function PicnicSet({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[2.7, 0.12, 0.86]} />
        <meshStandardMaterial color="#9b744d" roughness={0.82} />
      </mesh>
      {[-0.95, 0.95].map((z) => (
        <mesh key={`${position[0]}-${z}`} castShadow position={[0, 0.49, z]}>
          <boxGeometry args={[2.3, 0.1, 0.34]} />
          <meshStandardMaterial color="#6c8b63" roughness={0.9} />
        </mesh>
      ))}
      {[-0.88, 0.88].map((x) => (
        <mesh key={`${position[0]}-${x}`} castShadow position={[x, 0.36, 0]}>
          <boxGeometry args={[0.12, 0.72, 0.72]} />
          <meshStandardMaterial color="#4f5e49" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

function Vehicle({ position, color = '#26363c' }) {
  return (
    <group position={position}>
      <RoundedBox args={[3.2, 0.78, 1.74]} castShadow radius={0.12} smoothness={4}>
        <meshStandardMaterial color={color} metalness={0.22} roughness={0.36} />
      </RoundedBox>
      <RoundedBox
        args={[1.9, 0.52, 1.42]}
        castShadow
        position={[0.12, 0.47, 0]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial color={color} metalness={0.22} roughness={0.34} />
      </RoundedBox>
      {[
        [-1.08, -0.18, -0.82],
        [1.08, -0.18, -0.82],
        [-1.08, -0.18, 0.82],
        [1.08, -0.18, 0.82],
      ].map((wheel) => (
        <mesh
          key={wheel.join('-')}
          castShadow
          position={wheel}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.32, 0.32, 0.28, 16]} />
          <meshStandardMaterial color="#1a2024" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function BikeHub() {
  return (
    <group position={[31.5, 0, -1.4]}>
      <GridSurface
        baseColor="#95a176"
        cell={1.35}
        lineColor="#69734c"
        position={[0, 0.08, 0]}
        size={[18, 7.5]}
      />

      <RoundedBox
        args={[16.2, 0.22, 5.2]}
        castShadow
        position={[0, 3.15, 0]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial color="#1d2526" metalness={0.18} roughness={0.42} />
      </RoundedBox>

      {[-6.9, -2.3, 2.3, 6.9].map((x) => (
        <mesh key={`post-${x}`} castShadow position={[x, 1.58, 0]}>
          <boxGeometry args={[0.18, 3.16, 0.18]} />
          <meshStandardMaterial color="#222c2d" roughness={0.54} />
        </mesh>
      ))}

      {[-5.3, -2.65, 0, 2.65, 5.3].map((x) => (
        <group key={`rack-${x}`} position={[x, 0.15, 0]}>
          <mesh castShadow position={[0, 0.55, -0.36]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.52, 0.055, 10, 18, Math.PI]} />
            <meshStandardMaterial color="#9cac9f" roughness={0.58} />
          </mesh>
          <mesh castShadow position={[0, 0.15, -0.35]}>
            <boxGeometry args={[0.12, 0.28, 1.2]} />
            <meshStandardMaterial color="#60726b" roughness={0.68} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function GridSurface({
  position,
  size,
  baseColor,
  lineColor,
  cell = 1.6,
  rotation = [0, 0, 0],
}) {
  const [width, depth] = size;
  const xLines = [];
  const zLines = [];

  for (let x = -width / 2; x <= width / 2; x += cell) {
    xLines.push(x);
  }

  for (let z = -depth / 2; z <= depth / 2; z += cell) {
    zLines.push(z);
  }

  return (
    <group position={position} rotation={rotation}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={baseColor} roughness={0.98} />
      </mesh>
      {xLines.map((x) => (
        <mesh key={`x-${x}`} position={[x, 0.025, 0]} receiveShadow>
          <boxGeometry args={[0.05, 0.05, depth]} />
          <meshStandardMaterial color={lineColor} roughness={0.9} />
        </mesh>
      ))}
      {zLines.map((z) => (
        <mesh key={`z-${z}`} position={[0, 0.025, z]} receiveShadow>
          <boxGeometry args={[width, 0.05, 0.05]} />
          <meshStandardMaterial color={lineColor} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function ClubHouse() {
  return (
    <group position={[10, 0, 5]}>
      <RoundedBox args={[16.4, 5.3, 10.2]} castShadow receiveShadow position={[0, 2.65, 0]} radius={0.28}>
        <meshStandardMaterial color="#58392a" roughness={0.94} />
      </RoundedBox>
      <RoundedBox args={[17.4, 0.48, 11.2]} castShadow position={[0, 5.5, 0]} radius={0.22}>
        <meshStandardMaterial color="#202922" roughness={0.82} />
      </RoundedBox>
      <RoundedBox args={[6.8, 2.9, 7.1]} castShadow receiveShadow position={[6.9, 1.55, 0.6]} radius={0.2}>
        <meshStandardMaterial color="#425446" roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, 2.25, 5.18]}>
        <boxGeometry args={[13.8, 3.2, 0.12]} />
        <meshPhysicalMaterial
          color="#b7ccc4"
          metalness={0.08}
          roughness={0.08}
          transparent
          opacity={0.36}
          transmission={0.08}
        />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.18, 7.58]}>
        <boxGeometry args={[18.4, 0.22, 5.2]} />
        <meshStandardMaterial color="#cab48d" roughness={0.96} />
      </mesh>
    </group>
  );
}

function TerraceZone() {
  return (
    <group>
      <GridSurface
        baseColor="#c7b390"
        lineColor="#8b8367"
        position={[18, 0.09, 16]}
        size={[17.8, 10.4]}
      />
      <PicnicSet position={[14.2, 0.1, 14.5]} rotation={[0, 0.14, 0]} />
      <PicnicSet position={[20.6, 0.1, 17.6]} rotation={[0, -0.24, 0]} />
      <PicnicSet position={[17.8, 0.1, 12.2]} rotation={[0, 0.46, 0]} />
    </group>
  );
}

function ParkingZone() {
  return (
    <group>
      <GridSurface
        baseColor="#97a578"
        cell={1.35}
        lineColor="#6d764d"
        position={[43, 0.08, 16]}
        size={[24.5, 13.5]}
      />
      {[-8.2, -2.2, 3.8, 9.8].map((x) => (
        <mesh key={`lane-${x}`} position={[43 + x, 0.14, 16]}>
          <boxGeometry args={[0.08, 0.06, 12.8]} />
          <meshStandardMaterial color="#d9ddd4" roughness={0.88} />
        </mesh>
      ))}
      <Vehicle color="#23353c" position={[37.8, 0.45, 13.1]} />
      <Vehicle color="#4f575c" position={[43.9, 0.45, 13.2]} />
      <Vehicle color="#4b545a" position={[49.8, 0.45, 13.2]} />
      <Vehicle color="#28353c" position={[36.9, 0.45, 18.8]} />
      <Vehicle color="#41494d" position={[42.8, 0.45, 18.9]} />
    </group>
  );
}

function MiniCourt() {
  return (
    <group position={[32, 0, -27]}>
      <RoundedBox
        args={[18.2, 0.16, 28.2]}
        receiveShadow
        position={[0, 0.1, 0]}
        radius={0.12}
        rotation={[0, 0.18, 0]}
        smoothness={4}
      >
        <meshStandardMaterial color="#4a715f" roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, 0.18, 0]} rotation={[0, 0.18, 0]}>
        <boxGeometry args={[12.2, 0.05, 0.12]} />
        <meshStandardMaterial color="#e6eee5" roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.18, -9.4]} rotation={[0, 0.18, 0]}>
        <boxGeometry args={[12.2, 0.05, 0.12]} />
        <meshStandardMaterial color="#e6eee5" roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.18, 9.4]} rotation={[0, 0.18, 0]}>
        <boxGeometry args={[12.2, 0.05, 0.12]} />
        <meshStandardMaterial color="#e6eee5" roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0.18, 0]}>
        <ringGeometry args={[4.7, 4.9, 48]} />
        <meshStandardMaterial color="#edf3eb" roughness={0.44} />
      </mesh>
      {[-9.1, 9.1].map((z) => (
        <group key={`goal-${z}`} position={[0, 0, z]} rotation={[0, 0.18, 0]}>
          <mesh castShadow position={[0, 1.1, 0]}>
            <boxGeometry args={[3.4, 0.1, 0.1]} />
            <meshStandardMaterial color="#e8ede4" roughness={0.44} />
          </mesh>
          <mesh castShadow position={[-1.7, 0.55, 0]}>
            <boxGeometry args={[0.1, 1.1, 0.1]} />
            <meshStandardMaterial color="#e8ede4" roughness={0.44} />
          </mesh>
          <mesh castShadow position={[1.7, 0.55, 0]}>
            <boxGeometry args={[0.1, 1.1, 0.1]} />
            <meshStandardMaterial color="#e8ede4" roughness={0.44} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function BridgeConnection() {
  return (
    <group position={[1.8, 0, 8]} rotation={[0, 0.42, 0]}>
      <RoundedBox args={[15.4, 0.32, 3.26]} castShadow receiveShadow position={[0, 0.42, 0]} radius={0.08}>
        <meshStandardMaterial color="#566a61" roughness={0.9} />
      </RoundedBox>
      <mesh castShadow position={[0, 1.12, -1.48]}>
        <boxGeometry args={[15.1, 0.08, 0.12]} />
        <meshStandardMaterial color="#9bac9f" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 1.12, 1.48]}>
        <boxGeometry args={[15.1, 0.08, 0.12]} />
        <meshStandardMaterial color="#9bac9f" roughness={0.72} />
      </mesh>
      {[-6.6, -2.2, 2.2, 6.6].map((x) => (
        <group key={`bridge-${x}`} position={[x, 0, 0]}>
          <mesh castShadow position={[0, 0.75, -1.48]}>
            <boxGeometry args={[0.11, 1.34, 0.11]} />
            <meshStandardMaterial color="#70857a" roughness={0.8} />
          </mesh>
          <mesh castShadow position={[0, 0.75, 1.48]}>
            <boxGeometry args={[0.11, 1.34, 0.11]} />
            <meshStandardMaterial color="#70857a" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FishingDeck() {
  return (
    <group position={[-17.4, 0, -24]} rotation={[0, -0.32, 0]}>
      <RoundedBox args={[7.8, 0.24, 3.1]} castShadow receiveShadow position={[0, 0.28, 0]} radius={0.08}>
        <meshStandardMaterial color="#8f6c4b" roughness={0.92} />
      </RoundedBox>
      {[-3.1, -1.1, 1.1, 3.1].map((x) => (
        <mesh key={`pile-${x}`} castShadow position={[x, -0.3, -0.95]}>
          <boxGeometry args={[0.18, 1.25, 0.18]} />
          <meshStandardMaterial color="#5c4533" roughness={0.96} />
        </mesh>
      ))}
      <mesh castShadow position={[2.6, 0.92, 0]}>
        <boxGeometry args={[0.14, 1.26, 2.7]} />
        <meshStandardMaterial color="#93a69e" roughness={0.72} />
      </mesh>
    </group>
  );
}

function MainSportsField() {
  return (
    <group position={[32, 0, -56]} rotation={[0, -0.08, 0]}>
      <RoundedBox args={[48, 0.18, 32]} receiveShadow position={[0, 0.12, 0]} radius={0.08}>
        <meshStandardMaterial color="#4b844d" roughness={0.86} />
      </RoundedBox>
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[38.4, 0.04, 0.1]} />
        <meshStandardMaterial color="#eef4eb" roughness={0.44} />
      </mesh>
      <mesh position={[0, 0.21, -14]}>
        <boxGeometry args={[38.4, 0.04, 0.1]} />
        <meshStandardMaterial color="#eef4eb" roughness={0.44} />
      </mesh>
      <mesh position={[0, 0.21, 14]}>
        <boxGeometry args={[38.4, 0.04, 0.1]} />
        <meshStandardMaterial color="#eef4eb" roughness={0.44} />
      </mesh>
      <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.9, 6.05, 42]} />
        <meshStandardMaterial color="#eef4eb" roughness={0.44} />
      </mesh>
      <FenceRect position={[0, 0, 0]} size={[52, 36]} />
      {[
        [-24, -17],
        [-10, -18],
        [10, -18],
        [24, -16],
      ].map(([x, z]) => (
        <LightMast key={`${x}-${z}`} height={15} position={[x, 0, z]} />
      ))}
    </group>
  );
}

function FenceRect({ position, size }) {
  const [width, depth] = size;
  const posts = [];

  for (let x = -width / 2; x <= width / 2; x += 4.5) {
    posts.push([x, -depth / 2]);
    posts.push([x, depth / 2]);
  }

  for (let z = -depth / 2 + 4.5; z <= depth / 2 - 4.5; z += 4.5) {
    posts.push([-width / 2, z]);
    posts.push([width / 2, z]);
  }

  return (
    <group position={position}>
      <mesh position={[0, 1.55, -depth / 2]}>
        <boxGeometry args={[width, 0.06, 0.08]} />
        <meshStandardMaterial color="#aab5aa" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.55, depth / 2]}>
        <boxGeometry args={[width, 0.06, 0.08]} />
        <meshStandardMaterial color="#aab5aa" roughness={0.7} />
      </mesh>
      <mesh position={[-width / 2, 1.55, 0]}>
        <boxGeometry args={[0.08, 0.06, depth]} />
        <meshStandardMaterial color="#aab5aa" roughness={0.7} />
      </mesh>
      <mesh position={[width / 2, 1.55, 0]}>
        <boxGeometry args={[0.08, 0.06, depth]} />
        <meshStandardMaterial color="#aab5aa" roughness={0.7} />
      </mesh>
      {posts.map(([x, z]) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, 0.78, z]}>
          <boxGeometry args={[0.08, 1.56, 0.08]} />
          <meshStandardMaterial color="#7f8f85" roughness={0.82} />
        </mesh>
      ))}
    </group>
  );
}

function ForegroundWaterBasin() {
  return (
    <group position={[-41, 0, -42]}>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[10, 32]} />
        <meshStandardMaterial color="#7ea79f" roughness={0.34} metalness={0.08} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[11.4, 32]} />
        <meshStandardMaterial color="#96a88a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function BackdropForest() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 55]}>
        <planeGeometry args={[180, 24]} />
        <meshStandardMaterial color="#70815f" roughness={1} />
      </mesh>

      {backdropTreeLayout.map(([x, y, z, scale]) => (
        <BackdropTree key={`backdrop-${x}-${z}`} position={[x, y, z]} scale={scale} />
      ))}
    </group>
  );
}

function ParkScene() {
  return (
    <>
      <GroundPlane />
      <BackdropForest />
      <ForegroundWaterBasin />
      <WaterSystem />
      <PathNetwork />
      <BridgeConnection />
      <FishingDeck />
      <ClubHouse />
      <TerraceZone />
      <ParkingZone />
      <BikeHub />
      <MiniCourt />
      <MainSportsField />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-31, 0.02, -30]}>
        <circleGeometry args={[12.6, 32]} />
        <meshStandardMaterial color="#cdb68d" roughness={0.98} />
      </mesh>

      {treeLayout.map(([x, y, z, scale]) => (
        <Tree key={`${x}-${z}`} position={[x, y, z]} scale={scale} />
      ))}

      {shrubLayout.map(([x, y, z, scale]) => (
        <ShrubMass key={`${x}-${z}`} position={[x, y, z]} scale={scale} />
      ))}

      {[
        [18, 0, 30],
        [7, 0, 25],
        [28, 0, 4],
        [51, 0, 28],
        [2, 0, -53],
        [58, 0, -48],
      ].map((light) => (
        <LightMast key={light.join('-')} position={light} />
      ))}

      {/* Later kan hier een echt GLB/GLTF-masterplan worden ingeladen via useGLTF(),
          waarna de procedurale scene volledig of deels kan worden vervangen. */}
    </>
  );
}

function SceneModel() {
  if (!modelConfig.useGlb) {
    return <ParkScene />;
  }

  return (
    <Suspense fallback={<ParkScene />}>
      <ImportedModel
        position={modelConfig.position}
        rotation={modelConfig.rotation}
        scale={modelConfig.scale}
        src={modelConfig.src}
      />
    </Suspense>
  );
}

function SceneContent({
  cameraCommand,
  freeExplore,
  products,
  selectedId,
  started,
  tourActive,
  onSelectProduct,
}) {
  const controlsRef = useRef(null);
  const goalRef = useRef({
    position: new THREE.Vector3(...overviewCamera.position),
    target: new THREE.Vector3(...overviewCamera.target),
  });
  const introTarget = useMemo(() => new THREE.Vector3(...overviewCamera.target), []);
  const overviewPosition = useMemo(
    () => new THREE.Vector3(...overviewCamera.position),
    [],
  );
  const productMap = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products],
  );

  useEffect(() => {
    if (cameraCommand.type === 'overview') {
      goalRef.current = {
        position: new THREE.Vector3(...overviewCamera.position),
        target: new THREE.Vector3(...overviewCamera.target),
      };
      return;
    }

    const targetProduct = productMap.get(cameraCommand.productId);

    if (!targetProduct) {
      return;
    }

    goalRef.current = {
      position: new THREE.Vector3(...targetProduct.camera.position),
      target: new THREE.Vector3(...targetProduct.camera.target),
    };
  }, [cameraCommand, productMap]);

  useFrame((state, delta) => {
    if (!controlsRef.current) {
      return;
    }

    if (!started) {
      const elapsed = state.clock.getElapsedTime() * 0.08;
      const driftPosition = new THREE.Vector3(
        overviewPosition.x + Math.sin(elapsed) * 2.1,
        overviewPosition.y + Math.sin(elapsed * 1.6) * 0.45,
        overviewPosition.z + Math.cos(elapsed) * 1.9,
      );
      const amount = 1 - Math.exp(-delta * 1.5);
      state.camera.position.lerp(driftPosition, amount);
      controlsRef.current.target.lerp(introTarget, amount);
      controlsRef.current.update();
      return;
    }

    if (freeExplore) {
      controlsRef.current.update();
      return;
    }

    const amount = 1 - Math.exp(-delta * (tourActive ? 2.35 : 3.1));
    state.camera.position.lerp(goalRef.current.position, amount);
    controlsRef.current.target.lerp(goalRef.current.target, amount * 0.92);
    controlsRef.current.update();
  });

  return (
    <>
      <color attach="background" args={['#93a1a9']} />
      <fog attach="fog" args={['#a3b0b8', 52, 128]} />

      <ambientLight intensity={0.42} />
      <hemisphereLight
        args={['#e8eeef', '#495a46', 0.66]}
        position={[0, 40, 0]}
      />
      <directionalLight
        castShadow
        color="#f3ead4"
        intensity={1.54}
        position={[32, 34, 10]}
        shadow-bias={-0.00018}
        shadow-camera-bottom={-76}
        shadow-camera-far={150}
        shadow-camera-left={-76}
        shadow-camera-right={76}
        shadow-camera-top={76}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />

      <Sky
        distance={420}
        inclination={0.42}
        mieCoefficient={0.006}
        mieDirectionalG={0.82}
        rayleigh={0.92}
        sunPosition={[24, 8, -16]}
        turbidity={7.2}
      />

      <SceneModel />

      <group>
        {products.map((product) => (
          <Hotspot
            key={product.id}
            active={selectedId === product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </group>

      <ContactShadows
        color="#000000"
        far={34}
        opacity={0.16}
        position={[12, 0.01, -4]}
        resolution={1024}
        scale={140}
        blur={2.6}
      />

      <OrbitControls
        ref={controlsRef}
        dampingFactor={0.08}
        enablePan={false}
        enabled={started && freeExplore}
        makeDefault
        maxDistance={102}
        maxPolarAngle={Math.PI / 2.04}
        minDistance={20}
        minPolarAngle={0.4}
        rotateSpeed={0.68}
        target={overviewCamera.target}
      />
    </>
  );
}

function Scene(props) {
  return (
    <div className={styles.sceneRoot}>
      <Canvas
        camera={{
          position: overviewCamera.position,
          fov: 29,
          near: 0.1,
          far: 230,
        }}
        dpr={[1, 1.8]}
        gl={{ antialias: true }}
        shadows
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
}

export default Scene;
