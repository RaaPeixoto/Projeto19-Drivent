
import enrollmentRepository from "@/repositories/enrollment-repository";
import { createPayment, findPayment } from "@/repositories/payments-repository";
import { findTicket, updateTicket } from "@/repositories/tickets-repository";
import { Payment, Ticket, TicketType } from "@prisma/client";
import { notFoundTicketIdError, notTicketIdError, notUserTicketError } from "./errors";

export async function getPaymentsService(ticketId: string, userId: number): Promise<Payment> {
  await checkTicketById(ticketId, userId);

  return await findPayment(parseInt(ticketId));
}

export async function postPaymentService(paymentData: CreatePayment, userId: number) {
  const ticket = await checkTicketById(paymentData.ticketId.toString(), userId);
  const cardLastDigits = paymentData.cardData.number.slice(-4);
  await updateTicket(ticket.id);
  return await createPayment(
    paymentData.ticketId,
    ticket.TicketType.price,
    paymentData.cardData.issuer,
    cardLastDigits,
  );
}

async function checkTicketById(ticketId: string, userId: number): Promise<Ticket & { TicketType: TicketType }> {
  if (!ticketId) {
    throw notTicketIdError();
  }
  const ticket = await findTicket(parseInt(ticketId));
  if (!ticket) {
    throw notFoundTicketIdError();
  }
  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
  if (enrollment.userId !== userId) {
    throw notUserTicketError();
  }
  return ticket;
}
export type CreatePayment = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: string;
    name: string;
    expirationDate: Date;
    cvv: string;
  };
  
};
