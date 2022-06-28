export const getRandomInt = (min = 1000, max = 1000000) =>
  Math.floor(Math.random() * (max - min + 1) + min);
