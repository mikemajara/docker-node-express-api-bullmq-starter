import { NextFunction, Request, Response, Router } from "express";
import { queue } from "../../workers";
import { logger } from "../../lib/logger";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, data, options } = req.body;
  // if (await queue.getJob(name)) {
  //   await queue.remove(name);
  // }
  const job = await queue.add(name, data);
  logger.info(`job added. job ${JSON.stringify(job.asJSON(), null, 2)}`);
  res.send(`Job ${name} added! ID: ${job.id}`);
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, data } = req.body;
  res.json(await queue.getJobs());
});

router.delete(
  "/:jobId?",
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.params;
    if (jobId) {
      const result = await queue.remove(jobId);
      logger.info(`Result of deleting ${jobId} ${result}`);
      res.send(`Removed job ${jobId}`);
    } else if (jobId === "all") {
      let jobs = queue.getJobs();
      logger.info(`Deleting jobs ${JSON.stringify(jobs)}`);
    } else {
      const result = await queue.clean(0, 100);
      logger.info(`Result of deleting ${jobId} ${result}`);
    }
    // await queue.close();
    res.send(`Delete completed!`);
  }
);

export default router;
