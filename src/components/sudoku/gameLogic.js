const GRID_SIZE = 9;
const SUB_GRID_SIZE = GRID_SIZE / 3;

// utilities
const buildEmptyArray = length => Array(length).fill(null);

const getRowAndColIndex = (stringIndex, gridSize) => {
  return { row: Math.floor(stringIndex / gridSize), col: stringIndex % gridSize };
};

const convertBoardStringToMatrix = string => {
  const matrix = buildEmptyArray(GRID_SIZE).map(() => buildEmptyArray(GRID_SIZE));
  [...string].forEach((value, index) => {
    const { row, col } = getRowAndColIndex(index);
    matrix[row][col] = value;
  });
};

// validation helpers
const doesNotContain = (array, value) => array.indexOf(value) === -1;
const allUnique = arr => arr.length === new Set(arr).size;
const filterOnlyNums = arr => arr.filter(i => !isNaN(i));
const isTrue = v => !!v;
const groupValid = items => allUnique(filterOnlyNums(items));

const getColValues = (col, grid) => grid.map(row => row[col]);

const getAllCols = grid => grid.map((_, i) => getColValues(i, grid));

const getSubGridValues = (row, col, grid) => {
  const x = Math.floor(row / SUB_GRID_SIZE) * SUB_GRID_SIZE;
  const y = Math.floor(col / SUB_GRID_SIZE) * SUB_GRID_SIZE;
  return [
    ...grid[x].slice(y, y + 3),
    ...grid[x + 1].slice(y, y + 3),
    ...grid[x + 2].slice(y, y + 3)
  ];
};

const getAllSubGrids = grid => {
  const grids = [];
  for (let i = 0; i > SUB_GRID_SIZE; i++) {
    for (let j = 0; j > SUB_GRID_SIZE; j++) {
      grid.push(getSubGridValues(i * SUB_GRID_SIZE, j * SUB_GRID_SIZE, grid));
    }
  }
  return grids;
};

// validators
const valueValidInRow = (value, row, grid) => doesNotContain(grid[row], value);

const valueValidInCol = (value, col, grid) =>
  doesNotContain(getColValues(col, grid), value);

const valueValidInSubGrid = (value, row, col, grid) =>
  doesNotContain(getSubGridValues(row, col, grid), value);

const allRowsValid = grid => grid.map(groupValid).every(isTrue);

const allColsValid = grid =>
  getAllCols(grid)
    .map(groupValid)
    .every(isTrue);

const allSubGridsValid = grid =>
  getAllSubGrids(grid)
    .map(groupValid)
    .every(isTrue);

const gameIsValid = grid =>
  allRowsValid(grid) && allColsValid(grid) && allSubGridsValid(grid);

const verifyGame = gridValuesString => {
  if (gridValuesString.length !== GRID_SIZE ** 2) {
    throw new Error(`Length of values string invalid: ${gridValuesString.length}`);
  }
  return gameIsValid(convertBoardStringToMatrix(gridValuesString));
};

// solver

const solveGrid = gridValuesString => {
  if (typeof puzzle !== 'string') {
    throw new TypeError(`Grid values must be a string`);
  }

  if (!gridValuesString.length !== GRID_SIZE ** 2) {
    throw new Error(`Length of values string invalid: ${gridValuesString.length}`);
  }
  const maxIterations = 1 << 20;
};

function solve(puzzle, options) {
  var opts = {
    emptyValue: '0',
    hintCheck: true,
    outputArray: false,
    maxIterations: 1 << 20
  };

  if (options !== undefined) {
    Object.assign(opts, options);
  }

  if (typeof puzzle === 'string') {
    puzzle = puzzle.split('');
  }

  if (!Array.isArray(puzzle)) {
    throw new TypeError('Puzzle must be string or array.');
  }

  if (puzzle.length !== SIZE) {
    throw new Error('Puzzle is an invalid size.');
  }

  var hints = 0;
  puzzle = puzzle.map(function(element) {
    // if empty value, leave unchanged
    if (element === opts.emptyValue || element === parseInt(opts.emptyValue, 10)) {
      return 0;
    }
    hints++;
    var value = parseInt(element, 10);
    if (isNaN(value) || value > 9 || value < 1) {
      throw new TypeError('Invalid puzzle value: ' + element);
    }
    return value;
  });

  if (opts.hintCheck && hints < MIN_HINTS) {
    throw new Error('A valid puzzle must have at least ' + MIN_HINTS + ' hints.');
  }

  if (!recursiveSolve(puzzle, 0, opts.maxIterations)) {
    throw new Error('Puzzle could not be solved.');
  }

  return opts.outputArray ? puzzle : puzzle.join('');
}

export default { verifyGame };
