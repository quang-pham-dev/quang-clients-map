import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { calculateSunPositionInSpace } from "@/lib/helpers";

export function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const sunPosition = calculateSunPositionInSpace();

    if (sunRef.current) {
      sunRef.current.position.copy(sunPosition);
    }

    if (lightRef.current) {
      lightRef.current.position.copy(sunPosition);
    }
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      <directionalLight
        ref={lightRef}
        color="#FFF5B6"
        intensity={1.5}
        castShadow
      />
    </group>
  );
}
