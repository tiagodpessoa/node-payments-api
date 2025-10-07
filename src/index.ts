import express from "express";
import cors from "cors";
import { router as paymentRoutes } from "./modules/payments/payment.routes";
import { router as webhookRoutes } from "./modules/webhook/webhook.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/payments", paymentRoutes);
app.use("/webhook", webhookRoutes);

export { app };
