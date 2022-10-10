import { Queue, Worker } from "bullmq";
import { logger } from "../lib/logger";

const queue = new Queue("jobs", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT as unknown as number,
  },
});

const worker = new Worker("jobs", async (job) => {
  console.log(job.data);
});

worker.on("completed", (job) => {
  logger.info(`Job ${job.name} completed!`);
});

export { queue };
