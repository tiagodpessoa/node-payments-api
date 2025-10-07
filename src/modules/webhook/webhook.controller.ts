import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export class WebhookController {
  static async payment(req: Request, res: Response) {
    const { paymentId, status } = req.body;

    if (!paymentId || !status) {
      return res
        .status(400)
        .json({ error: "paymentId and status are required" });
    }

    try {
      const payment = await prisma.payment.update({
        where: { id: paymentId },
        data: { status },
      });

      await prisma.webhookEvent.create({
        data: {
          paymentId,
          type: "payment.confirmed",
          data: req.body,
        },
      });

      console.log(`Payment ${paymentId} status updated to ${status}`);
      return res.status(200).json({ message: "Webhook received", payment });
    } catch (error) {
      console.error(`Error handling webhook for payment ${paymentId}:`, error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
