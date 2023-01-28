import { CreatePayment } from "@/services/payments-service";
import Joi from "joi";

export const createPaymentSchema = Joi.object<CreatePayment>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().required(),
  }).required(),
});
