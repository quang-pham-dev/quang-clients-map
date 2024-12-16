import { Location } from "./location";

export interface Cluster extends Location {
  cities: Array<Location>;
}
