import { Queue, Worker, QueueScheduler } from "bullmq";
import IORedis from "ioredis";
import { env } from "./env";

export const connection = new IORedis(env.redisUrl, {
  maxRetriesPerRequest: null,
});
export const paymentQueue = new Queue("payments", { connection });
