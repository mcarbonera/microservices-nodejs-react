const carMakers = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date()];
console.log(carMakers);
console.log(dates);

const carsByMake = [
  ['f150'],
  ['corolla'],
  ['camaro']
]
console.log(carsByMake);

// Help with inference when extracting values.
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
carMakers.push('100');

// Help with 'map'
carMakers.map((car) => {
  return car.toUpperCase();
});
console.log(carMakers);

// Flexible types
const importantDates = [new Date(), '2030-10-10'];