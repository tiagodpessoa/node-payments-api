import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

export class PaymentController {
  static async create(req: Request, res: Response) {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ error: "userId and amount are required" });
    }

    try {
      const payment = await PaymentService.createPayment(userId, amount);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create payment" });
    }
  }
}
