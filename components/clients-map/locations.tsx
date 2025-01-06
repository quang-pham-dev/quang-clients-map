"use client";

import { useMemo, useState, useCallback, memo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

import { useGlobeRotation } from "@/hooks/use-globe-rotation";
import { globeMap } from "@/constants/assets";
import { MAP_CONSTANTS } from "@/constants/map";
import { clusteredLocations } from "@/lib/helpers";
import { Marker } from "@/components/clients-map/maker";

import { Cluster } from "@/interfaces/cluster";
import type { Location as MapLocation } from "@/interfaces/location";

// Pre-initialize shared geometries and materials
const sphereGeometry = new THREE.SphereGeometry(
  MAP_CONSTANTS.MAKER_RADIUS,
  64,
  64
);

interface LocationsProps {
  locations: MapLocation[];
  onSelectClusterAction: (cluster: Cluster | null) => void;
}

export const Locations = memo(function Locations({
  locations,
  onSelectClusterAction
}: LocationsProps) {
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const { locationsRef, markersRef, setIsRotating } = useGlobeRotation();

  // Optimize texture loading
  const earthTexture = useLoader(THREE.TextureLoader, globeMap.src);
  earthTexture.generateMipmaps = false;
  earthTexture.minFilter = THREE.LinearFilter;

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

  const globeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: earthTexture }),
    [earthTexture]
  );

  return (
    <group onClick={handleGlobeClick}>
      <mesh
        ref={locationsRef}
        geometry={sphereGeometry}
        material={globeMaterial}
      />
      <group ref={markersRef}>
        {clusteredLocationsMemo.map((cluster, index) => (
          <Marker
            key={`${cluster.lat}-${cluster.lng}-${index}`}
            marker={cluster}
            makerRadius={MAP_CONSTANTS.MAKER_RADIUS}
            isSelected={selectedCluster === cluster}
            onClick={handleMarkerClick}
          />
        ))}
      </group>
    </group>
  );
});
