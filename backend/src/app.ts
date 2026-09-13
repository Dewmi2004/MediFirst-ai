import express, { type Application, type Request, type Response } from "express";

export function createApp(): Application {
  const app = express();

  app.use(express.json());

  // Basic health check — real modules (auth, safety, etc.) mount here
  // starting Part 22 onward.
  app.get("/api/v1/health", (_req: Request, res: Response) => {
    res.json({ success: true, data: { status: "ok" } });
  });

  return app;
}
