import { ponder } from "@/generated";

ponder.on("gol:NewBoardEvent", async ({ event, context }) => {
  const { Board } = context.entities;
  const { board_id, address } = event.params;
});

ponder.on("gol:EvolveBoardEvent", async ({ event, context }) => {
  const { Board } = context.db;
  const { board_id, address,  } = event.params;
  // query {
  //   boards
  // }
  // const board = await Board.update({
  //   grid:
  // })
  // Save the board to the index
});
