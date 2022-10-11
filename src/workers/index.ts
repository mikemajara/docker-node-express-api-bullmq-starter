import { Job, Worker } from "bullmq";
import { logger } from "../lib/logger";
import { TASK_QUEUE, connection, getQueue } from "../queue";

export const queue = getQueue();

const worker = new Worker(
  TASK_QUEUE,
  async (job: Job) => {
    logger.info(`Executing job ${job.id}`);
    logger.info(`Data: ${JSON.stringify(job.asJSON(), null, 2)}`);
  },
  { autorun: true, connection }
);

worker.on("active", (job, prev) => {
  logger.info(`active. job: ${job.id}, prev: ${prev}`);
});
worker.on("closed", () => {
  logger.info(`closed. `);
});
worker.on("closing", (msg) => {
  logger.info(`closing. msg: ${msg}`);
});
worker.on("completed", (job, result) => {
  logger.info(`completed.  job: ${job.id}, result: ${result}`);
});
worker.on("drained", () => {
  logger.info(`drained. `);
});
worker.on("error", (err) => {
  logger.info(`error. ${err}`);
});
worker.on("failed", (job, prev) => {
  logger.info(`failed.  job: ${job.id}, prev: ${prev}`);
});
worker.on("ioredis:close", () => {
  logger.info(`ioredis:close. `);
});
worker.on("paused", () => {
  logger.info(`paused. `);
});
worker.on("progress", (job, progress) => {
  logger.info(`progress.  job: ${job.id}, progress: ${progress}`);
});
worker.on("resumed", () => {
  logger.info(`resumed. `);
});
worker.on("stalled", (jobId, prev) => {
  logger.info(`stalled.  job: ${jobId}, prev: ${prev}`);
});
