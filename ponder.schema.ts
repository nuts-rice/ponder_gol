import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Board: p.createTable(
    {
      grid: p.json<{ idx: number; isAlive?: boolean }>(),
      users: p.string().list(),
      id: p.string(),
      generation: p.int(),
      lastevolvedAt: p.int(),
      userGenerations: p.json<{ user: string; generations: number }>(),
    },
    {
      boardIdIndex: p.index("id"),
    }
  ),
}));
