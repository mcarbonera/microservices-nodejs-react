interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
  summary(): string;
}

const oldCivic: Vehicle = {
  name: 'civic',
  year: 2000,
  broken: true,
  summary(): string {
    return `Name: ${this.name}\n`+
      `Year: ${this.year}\n` + 
      `Broken? ${this.broken}`
  }
};

const printVehicle = (vehicle: Vehicle) => {
  console.log(vehicle.summary());
}

printVehicle(oldCivic);


interface Reportable {
  summary(): string;
}

const printSummary = (item: Reportable) => {
  console.log(item.summary());
}

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My dring has ${this.sugar} grams of sugar`;
  }
};

printSummary(drink);