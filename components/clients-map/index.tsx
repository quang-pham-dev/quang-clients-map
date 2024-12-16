"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Canvas, Vector3 } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import { Locations } from "@/components/clients-map/locations";
import { Sun } from "@/components/clients-map/sun";
import { MAP_CONSTANTS } from "@/constants/map";

import { Cluster } from "@/interfaces/cluster";
import { Location } from "@/interfaces/location";

const LocationDetail = dynamic(() => import("./location-detail"), {
  ssr: false
});

interface ClientsMapProps {
  locations: Location[];
}

export function ClientsMap({ locations }: ClientsMapProps) {
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectCluster = (cluster: Cluster | null) => {
    setSelectedCluster(cluster);
    setIsDrawerOpen(!!cluster);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute top-10 left-0 right-0 z-20 bg-opacity-50 p-4">
        <h1 className="text-white text-xl sm:text-2xl font-bold text-center">
          CLIENTS QUANG PHAM HAS WORKED AND IS WORKING WITH:
        </h1>
      </div>

      <Canvas
        camera={{
          position: MAP_CONSTANTS.CAMERA_POSITION as Vector3,
          fov: MAP_CONSTANTS.CAMERA_FOV
        }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <Sun />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Locations
          locations={locations}
          onSelectClusterAction={handleSelectCluster}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>

      <LocationDetail
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        selectedCluster={selectedCluster}
      />
    </div>
  );
}
