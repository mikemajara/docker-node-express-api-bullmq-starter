import { Queue, Worker } from "bullmq";
import { logger } from "@lib/logger";

const queue = new Queue("jobs");

const worker = new Worker("jobs", async (job) => {
  console.log(job.data);
});

worker.on("completed", (job) => {
  logger.info(`Job ${job.name} completed!`);
});
