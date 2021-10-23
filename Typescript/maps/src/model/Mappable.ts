import { Coordinate } from './Coordinate';
export interface Mappable {
  location: Coordinate;
  markerContent(): string;
}