/// <reference types="@types/google.maps" />

import { User } from './User';
import { Company } from './Company';
import { Map } from './Map';

const user: User = new User();
const company: Company = new Company();
const map: Map = new Map('map');

console.log(user);
console.log(company);

map.addMarker(user);
map.addMarker(company);