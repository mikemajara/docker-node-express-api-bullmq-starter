import { NextFunction, Request, Response, Router } from "express";
import { Queue } from "bullmq";

const router = Router();

const queue = new Queue("jobs", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT as aunknown as number,
  },
});

router.get("/:name", (req: Request, res: Response, next: NextFunction) => {
  const { name, data } = req.body;
  queue.add(name, data);
  res.send(`Job ${name} added!`);
});

router.post("/add", (req: Request, res: Response, next: NextFunction) => {
  const { name, data } = req.body;
  queue.add(name, data);
  res.send(`Job ${name} added!`);
});

export default router;
