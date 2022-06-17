import { Gan } from '../src/';

test('Gan(i).YinYang, i is odd', () => {
  expect(Gan(1).YinYang).toBe(0);
});
test('Gan(i).YinYang, i is even', () => {
  expect(Gan(0).YinYang).toBe(1);
});
