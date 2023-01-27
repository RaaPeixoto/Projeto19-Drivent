
import { Ticket } from "@/schemas";
import { getTicketsService, getTicketsTypeService, postTicketService } from "@/services/tickets-services";

import { Request, Response } from "express";
import httpStatus from "http-status";
export async function getTicketsTypes(req: Request, res: Response) {
  try {
    const result = await getTicketsTypeService();

    return res.status(200).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
export async function getTickets(req: Request, res: Response) {
  const userId = res.locals.userId as number;
  try {
    const result = await getTicketsService(userId);
    if(!result) {
      return res.sendStatus(404);
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
export async function postTicket(req: Request, res: Response) {
  const { ticketTypeId } = req.body as Ticket;
  const userId = res.locals.userId as number;
  const postedTicket = await postTicketService(userId, ticketTypeId);
  try{
    return res.status(201).send(postedTicket);
  }catch (error) {
    console.log(error);
    return res.status(400).send({});
  }
}

