import { ponder } from "@/generated";
import { advanceGrid } from "./lib/actions";
type CellGrid = boolean[][];
const HEIGHT = 20;
const WIDTH = 20;
ponder.on("Gol:EvolveBoardEvent", async ({ event, context }) => {
  const { Board } = context.db;
  const init_grid = new Array(HEIGHT)
    .fill(false)
    .map(() => new Array(WIDTH).fill(false));

  await Board.upsert({
    id: event.args.board_id,
    create: {
      grid: init_grid,
      generation: 0,
      users: [event.args.userAddress],
      lastevolvedAt: Date.now(),
      userGenerations: { user: event.args.userAddress, generations: 1 },
    },
    update: ({ current }) => ({
      grid: advanceGrid(current.grid),
      generation: current.generation + 1,
      users: current.users.includes(event.args.userAddress)
        ? current.users
        : [...current.users, event.args.userAddress],
      lastevolvedAt: Date.now(),
      userGenerations: {
        user: event.args.userAddress,
        generations: current.userGenerations.generations + 1,
      },
    }),
    // const { Board } = context.entities;
    // const { board_id, address } = event.params;
  });

  ponder.on("Gol:NewBoardEvent", async ({ event, context }) => {
    const { Board } = context.db;
    const grid = new Array(HEIGHT)
      .fill(false)
      .map(() => new Array(WIDTH).fill(false));

    await Board.create({
      id: event.args.board_id,
      data: {
        grid: grid,
        generation: 0,
        users: [event.args.userAddress],
        lastevolvedAt: Date.now(),
        userGenerations: { user: event.args.userAddress, generations: 1 },
      },
    });
  });
});
// const { board_id, address,  } = event.params;
// query {
//   boards
// }
// const board = await Board.update({
//   grid:
// })
// Save the board to the index
