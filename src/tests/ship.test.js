import { Ship } from '../factories/ship.js';

test('check ship object has properties', () => {
  expect(Ship(5).isSunk()).toBe(false);
  expect(Ship(5)).toHaveProperty('length', 5);
  expect(Ship(5)).toHaveProperty('hits', 0);
})

test('hits increase on the boat', () => {
  const battleShip = Ship(5);
  battleShip.hit();

  expect(battleShip.hits).toBe(1);
  expect(battleShip.isSunk()).toBe(false);
})

test('isSunk is true once hits amount to length', () => {
  const battleShip = Ship(10);
  for (let i = 0; i < 10; i++) {
    battleShip.hit();
  }

  expect(battleShip.isSunk()).toBe(true);
  expect(battleShip.hits).toBeGreaterThanOrEqual(10);

})