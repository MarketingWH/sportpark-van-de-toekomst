import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

function ImportedModel({ position, rotation, scale, src }) {
  const { scene } = useGLTF(src);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}

export default ImportedModel;
