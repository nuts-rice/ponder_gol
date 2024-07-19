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

  await Board.update({
    id: event.args.board_id,
    data: ({ current }) => ({
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
        spawnTimestamp: event.block.timestamp,
      },
    });
  });
});
