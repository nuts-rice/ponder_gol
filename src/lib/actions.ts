// import
import { HEIGHT, WIDTH, CellGrid } from "../../ponder.schema";

export const getLiveNeighbors = (
  grid: CellGrid,
  x: number,
  y: number
): number => {
  let count = 0;
  const ops = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  ops.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (
      newX >= 0 &&
      newX < HEIGHT &&
      newY >= 0 &&
      newY < WIDTH &&
      grid[newX]?.[newY]
    ) {
      count++;
    }
  });

  return count;
};

export const initGrid = (): CellGrid => {
  return new Array(HEIGHT).fill(false).map(() => new Array(WIDTH).fill(false));
};

export const advanceGrid = (grid: CellGrid): CellGrid => {
  const newGrid = initGrid();
  for (let x = 0; x < HEIGHT; x++) {
    for (let y = 0; y < WIDTH; y++) {
      const liveNeighbors = getLiveNeighbors(grid, x, y);
      if (grid[x][y]) {
        newGrid[x][y] = liveNeighbors === 2 || liveNeighbors === 3;
      } else {
        newGrid[x][y] = liveNeighbors === 3;
      }
    }
  }
  return newGrid;
};
