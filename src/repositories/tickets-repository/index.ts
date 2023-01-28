import { prisma } from "@/config";

import { Ticket, TicketStatus, TicketType } from "@prisma/client";

export async function findTicketsType(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

export async function findTicketsTypeById(id: number): Promise<TicketType> {
  return await prisma.ticketType.findFirst({
    where: {
      id: id,
    },
  });
}
export async function findTicketsByUserId(userId: number): Promise<Ticket & { TicketType: TicketType }> {
  return await prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
  });
}
export async function findTicket(id: number): Promise<
  Ticket & {
    TicketType: TicketType;
  }
> {
  return await prisma.ticket.findFirst({
    where: {
      id: id,
    },
    include: {
      TicketType: true,
    },
  });
}
export async function insertTicket(ticketTypeId: number, enrollmentId: number): Promise<Ticket> {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED,
    },
  });
}

export async function updateTicket(id: number) {
  await prisma.ticket.update({
    where: { id },
    data: {
      status: TicketStatus.PAID,
    },
  });
}
