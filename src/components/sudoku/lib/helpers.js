export const GRID_SIZE = 9;

export const buildEmptyArray = length => Array(length).fill(null);

export const shuffled = array => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const getIndexes = (array, testFn = () => true) =>
  array.reduce((indexes, v, i) => {
    return testFn(v) ? [...indexes, i] : indexes;
  }, []);

export const getRandomIndex = (arrayLength = 81) =>
  Math.floor(Math.random() * arrayLength);

export const getRandomElement = array => {
  return array[getRandomIndex(array.length)];
};

export const initEmptyGridCells = (width = GRID_SIZE, height = GRID_SIZE) =>
  buildEmptyArray(width * height).map(() => 0);

export const calcRowAndCol = (index, gridWidth = GRID_SIZE) => {
  return { row: Math.floor(index / gridWidth), col: index % gridWidth };
};

export const serializeValuesArray = array => array.reduce((str, v) => str + v, '');

export const deserializeValuesString = string => [...string].map(v => parseInt(v, 10));

export const checkIsFilled = gridArray => {
  for (let value of gridArray) {
    if (value === 0) return false;
  }
  return true;
};

export const checkIsEmpty = gridArray => {
  for (let value of gridArray) {
    if (value !== 0) return false;
  }
  return true;
};

export const countCellsFilled = gridArray =>
  gridArray.reduce((count, cell) => (cell !== 0 ? count + 1 : count), 0);
