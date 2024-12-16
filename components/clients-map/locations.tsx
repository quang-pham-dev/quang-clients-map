"use client";

import { useMemo, useState, useCallback } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

import { useGlobeRotation } from "@/hooks/use-globe-rotation";
import { globeMap } from "@/constants/assets";
import { MAP_CONSTANTS } from "@/constants/map";
import { Marker } from "@/components/clients-map/maker";
import { Cluster } from "@/interfaces/cluster";
import { Location } from "@/interfaces/location";
import { clusteredLocations } from "@/lib/helpers";

interface LocationsProps {
  locations: Location[];
  onSelectClusterAction: (cluster: Cluster | null) => void;
}

export function Locations({
  locations,
  onSelectClusterAction
}: LocationsProps) {
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const { locationsRef, markersRef, setIsRotating } = useGlobeRotation();

  const earthTexture = useLoader(THREE.TextureLoader, globeMap.src);
  const clusteredLocationsMemo = useMemo(
    () => clusteredLocations(locations),
    [locations]
  );

  const handleMarkerClick = useCallback(
    (clickedCluster: Cluster) => {
      setSelectedCluster((prevSelected) => {
        const newSelected =
          prevSelected === clickedCluster ? null : clickedCluster;
        setIsRotating(!newSelected);
        onSelectClusterAction(newSelected);

        return newSelected;
      });
    },
    [onSelectClusterAction, setIsRotating]
  );

  const handleGlobeClick = useCallback(() => {
    setSelectedCluster(null);
    setIsRotating(true);
    onSelectClusterAction(null);
  }, [onSelectClusterAction, setIsRotating]);

  return (
    <group onClick={handleGlobeClick}>
      <mesh ref={locationsRef}>
        <sphereGeometry args={[MAP_CONSTANTS.MAKER_RADIUS, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      <group ref={markersRef}>
        {clusteredLocationsMemo.map((cluster, index) => (
          <Marker
            key={index}
            marker={cluster}
            makerRadius={MAP_CONSTANTS.MAKER_RADIUS}
            isSelected={selectedCluster === cluster}
            onClick={handleMarkerClick}
          />
        ))}
      </group>
    </group>
  );
}
