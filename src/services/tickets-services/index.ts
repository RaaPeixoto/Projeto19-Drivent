import enrollmentRepository from "@/repositories/enrollment-repository";
import { findTicket, findTicketsByUserId, findTicketsType, findTicketsTypeById, insertTicket } from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";
import { notFoundEnrollmentError } from "./errors";

export async function postTicketService(userId: number, ticketTypeId: number): Promise<Ticket & {
    TicketType: TicketType;
}> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {
    throw notFoundEnrollmentError();
  }
  const insertedTicket = await insertTicket(ticketTypeId, enrollment.id);
  const insertedTicketData = await findTicket(insertedTicket.id);
  return insertedTicketData;
}

export async function getTicketsTypeService(): Promise<TicketType[]> {
  return await findTicketsType();
}

export async function getTicketsService(userId: number): Promise<Ticket & {TicketType: TicketType;}> {
  return await findTicketsByUserId(userId);
}
