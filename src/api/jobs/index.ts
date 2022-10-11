import { NextFunction, Request, Response, Router } from "express";
import { queue } from "../../workers";
import { logger } from "../../lib/logger";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, data, options } = req.body;
  // if (await queue.getJob(name)) {
  //   await queue.remove(name);
  // }
  const job = await queue.add(name, data, {
    ...options,
    removeOnComplete: true,
  });
  logger.info(`Added job ${JSON.stringify(job.asJSON(), null, 2)}`);
  res.json(job);
});

router.get(
  "/:jobId?",
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.params;
    if (jobId) {
      res.json(await queue.getJob(jobId));
    } else {
      res.json(await queue.getJobs());
    }
  }
);

router.delete(
  "/:jobId?",
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.params;
    if (jobId) {
      const result = await queue.remove(jobId);
      logger.info(`Deleted job ${jobId}`);
    } else {
      const result = await queue.clean(0, 100);
      logger.info(`Deleted jobs ${result}`);
    }
    res.json(await queue.getJobs());
  }
);

export default router;
