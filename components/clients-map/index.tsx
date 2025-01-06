"use client";

import { useState, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import { Cluster } from "@/interfaces/cluster";
import type { Location as MapLocation } from "@/interfaces/location";

// dynamic imports smaller chunks
const LocationDetail = dynamic(
  () =>
    import("./location-detail").then((mod) => ({
      default: memo(mod.default)
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen animate-pulse bg-gray-200">
        Loading details...
      </div>
    )
  }
);

const MapClient = dynamic(
  () =>
    import("./map").then((mod) => ({
      default: memo(mod.default)
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen animate-pulse bg-gray-200">Loading map...</div>
    )
  }
);

interface ClientsMapProps {
  locations: MapLocation[];
}

export const ClientsMap = memo(function ClientsMap({
  locations
}: ClientsMapProps) {
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectCluster = useCallback((cluster: Cluster | null) => {
    setSelectedCluster(cluster);
    setIsDrawerOpen(!!cluster);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <div className="absolute top-10 left-0 right-0 z-20 bg-opacity-50 p-4">
        <h1 className="text-white text-xl sm:text-2xl font-bold text-center">
          CLIENTS QUANG PHAM HAS WORKED AND IS WORKING WITH:
        </h1>
      </div>

      <MapClient
        key={locations.length}
        locations={locations}
        onSelectClusterAction={handleSelectCluster}
      />

      {isDrawerOpen && (
        <LocationDetail
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          selectedCluster={selectedCluster}
        />
      )}
    </div>
  );
});
