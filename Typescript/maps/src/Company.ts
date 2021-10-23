import { Mappable } from './model/Mappable';
import { Coordinate } from './model/Coordinate';
import faker from 'faker';

export class Company implements Mappable {
  companyName: string;
  catchPhrase: string;
  location: Coordinate;

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }

  markerContent(): string {
    return `
    <h1>Company Name is ${this.companyName}</h1>
    <h3>CatchPhrase: ${this.catchPhrase}</h3>
    `
  }
}