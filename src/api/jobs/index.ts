import { NextFunction, Request, Response, Router } from "express";
import { Queue } from "bullmq";
import { queue } from "../../workers";
import { logger } from "../../lib/logger";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, data, options } = req.body;
  await queue.add(name, data, options);
  res.send(`Job ${name} added!`);
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, data } = req.body;
  res.json(await queue.getJobs());
});

export default router;
