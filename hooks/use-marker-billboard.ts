import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

export function useMarkerBillboard() {
  const markerRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Sprite>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (markerRef.current) {
      markerRef.current.quaternion.copy(camera.quaternion);
    }
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return {
    markerRef,
    textRef
  };
}
