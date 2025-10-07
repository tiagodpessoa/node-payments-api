import { prisma } from "../../config/prisma";
import { paymentQueue } from "../../config/redis";

export class PaymentService {
  static async createPayment(userId: number, amount: number) {
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
      },
    });

    await paymentQueue.add("payment", { paymentId: payment.id });

    return payment;
  }
}
