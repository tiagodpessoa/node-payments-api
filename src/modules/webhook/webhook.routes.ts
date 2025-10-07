import { Router } from "express";
import { WebhookController } from "./webhook.controller";

export const router = Router();

router.post("/payment", WebhookController.payment);
