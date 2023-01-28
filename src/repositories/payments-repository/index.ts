import { prisma } from "@/config";
import { Payment } from "@prisma/client";

export async function findPayment(id: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: {
      ticketId: id,
    },
  });
}

export async function createPayment(
  ticketId: number,
  value: number,
  cardIssuer: string,
  cardLastDigits: string,
): Promise<Payment> {
  return await prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits,
    },
  });
}
