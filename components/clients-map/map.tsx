import { Suspense, memo, useCallback, useMemo } from "react";
import { CameraProps, Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import { Locations } from "./locations";
import { Sun } from "./sun";
import { MAP_CONSTANTS } from "@/constants/map";
import { Cluster } from "@/interfaces/cluster";
import { Location } from "@/interfaces/location";

// split components heavy chunks
const EnhancedStars = memo(function EnhancedStars() {
  return (
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  );
});

interface MapProps {
  locations: Location[];
  onSelectClusterAction: (cluster: Cluster | null) => void;
}

const MapClient = memo(function Map({
  locations,
  onSelectClusterAction
}: MapProps) {
  const handleSelectCluster = useCallback(
    (cluster: Cluster | null) => {
      onSelectClusterAction(cluster);
    },
    [onSelectClusterAction]
  );

  const cameraSettings = useMemo(
    () => ({
      position: MAP_CONSTANTS.CAMERA_POSITION,
      fov: MAP_CONSTANTS.CAMERA_FOV
    }),
    []
  );

  return (
    <Canvas
      camera={cameraSettings as CameraProps}
      shadows
      dpr={window.devicePixelRatio} // Optimize DPR based on device
      performance={{ min: 0.5 }}
      gl={{
        antialias: false, // Disable antialiasing for better performance
        powerPreference: "high-performance",
        alpha: false
      }}
    >
      <Suspense fallback={null}>
        <scene>
          <ambientLight intensity={0.5} />
          <Sun />
          <pointLight position={[10, 10, 10]} />

          <Suspense fallback={null}>
            <Locations
              locations={locations}
              onSelectClusterAction={handleSelectCluster}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
          />

          <EnhancedStars />
        </scene>
      </Suspense>
    </Canvas>
  );
});

export default MapClient;
