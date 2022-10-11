import { ConnectionOptions, jobIdForGroup, Queue } from "bullmq";
import { logger } from "../lib/logger";

export const TASK_QUEUE = "jobs";

export const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT as unknown as number,
  password: process.env.REDIS_PASSWORD,
};

export const getQueue = () => {
  const queue = new Queue(TASK_QUEUE, { connection });

  queue
    .waitUntilReady()
    .then((data) => {
      logger.info(`Queue ready!`);
    })
    .catch((err) => {
      logger.error(`Unexpected error instancing queue`, err);
    });

  queue.on("cleaned", (job, type) => {
    logger.info(`cleaned. job: ${job}, type: ${type}`);
  });

  queue.on("error", (err) => {
    logger.error(err);
  });

  queue.on("ioredis:close", () => {
    logger.info(`ioredis:close`);
  });

  queue.on("paused", () => {
    logger.info("paused");
  });

  queue.on("progress", (job, progress) => {
    logger.info(`progress. job ${job}, progress: ${progress}`);
  });

  queue.on("removed", (job) => {
    logger.info(`removed. job ${job.id}`);
  });
  queue.on("resumed", () => {
    logger.info("resumed");
  });

  queue.on("waiting", (job) => {
    logger.info(`waiting ${job.id}`);
  });
  return queue;
};
