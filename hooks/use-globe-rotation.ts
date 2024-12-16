import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { MAP_CONSTANTS } from "@/constants/map";

export function useGlobeRotation() {
  const locationsRef = useRef<THREE.Group>(null);
  const markersRef = useRef<THREE.Group>(null);
  const [isRotating, setIsRotating] = useState(true);

  useFrame(() => {
    if (locationsRef.current && markersRef.current && isRotating) {
      locationsRef.current.rotation.y += MAP_CONSTANTS.ROTATION_SPEED;
      markersRef.current.rotation.copy(locationsRef.current.rotation);
    }
  });

  return {
    locationsRef,
    markersRef,
    isRotating,
    setIsRotating
  };
}
