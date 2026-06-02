import { Float, Html } from '@react-three/drei';
import { useState } from 'react';
import styles from './Hotspot.module.css';

function Hotspot({ active, product, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={product.position}>
      <Float speed={1.8} floatIntensity={0.28} rotationIntensity={0.08}>
        <mesh castShadow position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color="#eef3f5"
            emissive={product.color}
            emissiveIntensity={active || hovered ? 0.52 : 0.16}
            metalness={0.06}
            roughness={0.14}
          />
        </mesh>
        <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.48, 0.62, 36]} />
          <meshBasicMaterial
            color="#eff4f6"
            opacity={active || hovered ? 0.9 : 0.42}
            transparent
          />
        </mesh>
      </Float>

      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.68, 8]} />
        <meshStandardMaterial color="#dfe7e8" emissive="#dfe9de" emissiveIntensity={0.08} />
      </mesh>

      <Html
        center
        distanceFactor={11}
        position={[0, 1.22, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <button
          className={`${styles.hotspotButton} ${active ? styles.active : ''}`}
          style={{ '--accent': product.color }}
          type="button"
          onBlur={() => setHovered(false)}
          onClick={() => onSelect(product.id)}
          onFocus={() => setHovered(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className={styles.core} />
          <span className={styles.outerRing} />
          <span className={`${styles.tooltip} ${hovered ? styles.tooltipVisible : ''}`}>
            <strong>{product.shortLabel}</strong>
            <small>{product.zone}</small>
          </span>
        </button>
      </Html>
    </group>
  );
}

export default Hotspot;
