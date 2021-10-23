class Vehicle {
  color: string = 'red';

  constructor(color?: string) {
    this.color = color ? color : this.color;
  }

  public drive(): void {
    console.log('running!');
  }

  public honk(): void {
    console.log('beep');
  }
}

class Car extends Vehicle {
  constructor(public wheels: number, color?: string) {
    super(color);
  }

  public drive(): void {
    console.log('vrum!');
  }
  name: string
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);
vehicle.drive();
vehicle.honk();

const car = new Car(4);
console.log(car.color);
car.drive();
car.honk();