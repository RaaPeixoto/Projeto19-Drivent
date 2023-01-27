
import Joi from "joi";
export type Ticket = { ticketTypeId: number }
export const createTicketSchema = Joi.object<Ticket>({
  ticketTypeId: Joi.number().required()
});
