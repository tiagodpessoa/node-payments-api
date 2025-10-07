import { Worker, Job } from "bullmq";
import axios from "axios";
import { connection } from "../config/redis";
import { env } from "../config/env";

const worker = new Worker(
  "payments",
  async (job: Job) => {
    console.log(`Processing payment job ${job.id} with data:`, job.data);

    const { paymentId } = job.data;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await axios.post(
      `${
        env.port ? `http://localhost:${env.port}` : "http://localhost:3000"
      }/webhook/payment`,
      {
        paymentId,
        status: "COMPLETED",
      }
    );

    console.log(`Payment job ${job.id} completed.`);
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} has been completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} has failed with error: ${err.message}`);
  console.error("Full error details:", JSON.stringify(err, null, 2));
});
