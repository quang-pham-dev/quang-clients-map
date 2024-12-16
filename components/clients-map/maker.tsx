import { useMemo, useCallback } from "react";
import { ThreeEvent } from "@react-three/fiber";

import { latLongToVector } from "@/lib/helpers";
import { Cluster } from "@/interfaces/cluster";
import { useMarkerBillboard } from "@/hooks/use-marker-billboard";
import { useMarkerLabel } from "@/hooks/use-marker-label";

interface MarkerProps {
  marker: Cluster;
  makerRadius: number;
  isSelected: boolean;
  onClick: (cluster: Cluster) => void;
}

export function Marker({
  marker,
  makerRadius,
  isSelected,
  onClick
}: MarkerProps) {
  const { lat, lng, label } = marker;
  const { markerRef, textRef } = useMarkerBillboard();
  const textTexture = useMarkerLabel({ label, isSelected });

  const position = useMemo(
    () => latLongToVector(lat, lng, makerRadius),
    [lat, lng, makerRadius]
  );

  const labelPosition = useMemo(
    () => position.clone().multiplyScalar(1.05),
    [position]
  );

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      onClick(marker);
    },
    [onClick, marker]
  );

  return (
    <group onClick={handleClick}>
      <group ref={markerRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={isSelected ? "red" : "orange"} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
      <sprite ref={textRef} position={labelPosition} scale={[0.5, 0.5, 1]}>
        <spriteMaterial map={textTexture} />
      </sprite>
    </group>
  );
}
