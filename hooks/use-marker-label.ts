import { useMemo } from "react";
import * as THREE from "three";

interface UseMarkerLabelProps {
  label: string;
  isSelected: boolean;
}

export function useMarkerLabel({ label, isSelected }: UseMarkerLabelProps) {
  const textTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 256;
    canvas.height = 256;

    if (context) {
      context.font = "Bold 24px Arial";
      context.fillStyle = isSelected ? "red" : "white";
      context.textAlign = "center";
      context.fillText(label, 128, 128);
    }

    return new THREE.CanvasTexture(canvas);
  }, [label, isSelected]);

  return textTexture;
}
