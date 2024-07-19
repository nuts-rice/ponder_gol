import { createSchema } from "@ponder/core";
export const HEIGHT = 40;
export const WIDTH = 40;
export type CellGrid = boolean[][];

export default createSchema((p) => ({
  Board: p.createTable({
    grid: p.json<CellGrid>(),
    users: p.string().list(),
    id: p.string(),
    generation: p.int(),
    lastevolvedAt: p.int(),
    userGenerations: p.json<{ user: string; generations: number }>(),
    spawnTimestamp: p.bigint(),
  }),
}));
