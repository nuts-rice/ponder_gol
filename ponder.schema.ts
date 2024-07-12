import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  board: p.createTable({
    grid: p.json(),
    users: p.string().list(),
    id: p.string(),
    last_evolved_at: p.int(),
  }),
}));
