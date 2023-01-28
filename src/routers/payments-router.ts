import { getPaymentsByTicketId, postPayment } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPaymentSchema } from "@/schemas/payment-schema";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter.get("/", authenticateToken, getPaymentsByTicketId);
paymentsRouter.post("/process", authenticateToken, validateBody(createPaymentSchema), postPayment);
export { paymentsRouter };
