import httpStatus from "http-status";
import { Request, Response } from "express";
import { CreatePayment, getPaymentsService, postPaymentService } from "@/services/payments-service";

export type Query = {
  ticketId?: string;
};
export async function getPaymentsByTicketId(req: Request, res: Response) {
  const { ticketId } = req.query as Query;
  const userId = res.locals.userId as number;
  const result = await getPaymentsService(ticketId, userId);
  try {
    return res.status(200).send(result);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}
export async function postPayment(req: Request, res: Response) {
  const paymentData = req.body as CreatePayment;
  const userId = res.locals.userId as number;
  const response = await postPaymentService(paymentData, userId);
  try {
    return res.status(200).send(response);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error });
  }
}

