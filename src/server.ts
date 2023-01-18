import { app } from "./util";

const address = "localhost:3000";

export const server = app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});
