import { Mappable } from './model/Mappable';
import faker from 'faker';
import { Coordinate } from './model/Coordinate';

class User implements Mappable {
  name: string;
  location: Coordinate;

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

  markerContent(): string {
    
    return `<h3>User Name is ${this.name}</h3>`
  }
}

export { User };