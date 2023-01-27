import { getTickets, getTicketsTypes, postTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { Router } from "express";
import { createTicketSchema } from "@/schemas";
const ticketsRouter = Router();

ticketsRouter.get("/types", authenticateToken, getTicketsTypes );
ticketsRouter.post("/", authenticateToken, validateBody(createTicketSchema), postTicket);
ticketsRouter.get("/", authenticateToken, getTickets);
export { ticketsRouter };
