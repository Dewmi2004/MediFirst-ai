import "dotenv/config";
import { createApp } from "./src/app";

const PORT = process.env.PORT ?? 4000;
const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`MediFirst AI backend listening on port ${PORT}`);
});
