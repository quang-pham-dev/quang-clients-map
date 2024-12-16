import * as THREE from "three";
import { Cluster } from "@/interfaces/cluster";
import { Location } from "@/interfaces/location";

export function calculateSunPositionInSpace() {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const timeOfDay = now.getHours() / 24 + now.getMinutes() / 1440;

  const declination =
    -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * (Math.PI / 180));

  const declinationRad = declination * (Math.PI / 180);
  const timeRad = timeOfDay * 2 * Math.PI;

  const x = Math.cos(declinationRad) * Math.cos(timeRad);
  const y = Math.sin(declinationRad);
  const z = Math.cos(declinationRad) * Math.sin(timeRad);

  return new THREE.Vector3(x, y, z).normalize().multiplyScalar(10);
}

export function latLongToVector(
  latitude: number,
  longitude: number,
  radius: number
) {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

const calculateAverage = (
  cities: { lat: number; lng: number }[],
  key: "lat" | "lng"
) => cities.reduce((sum, city) => sum + city[key], 0) / cities.length;

export const clusteredLocations = (locations: Location[]) => {
  return Object.values(
    locations.reduce((clusters: { [key: string]: Cluster }, location) => {
      if (!clusters[location.country]) {
        clusters[location.country] = {
          lat: location.lat,
          lng: location.lng,
          label: location.country,
          country: location.country,
          cities: []
        };
      }
      clusters[location.country].cities.push(location);
      return clusters;
    }, {})
  ).map((cluster) => ({
    ...cluster,
    label: `${cluster.country} (${cluster.cities.length})`,
    lat: calculateAverage(cluster.cities, "lat"),
    lng: calculateAverage(cluster.cities, "lng")
  }));
};
