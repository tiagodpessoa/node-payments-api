import { Router } from "express";
import { PaymentController } from "./payment.controller";

export const router = Router();

router.post("/", PaymentController.create);
