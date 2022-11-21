import { Router } from "express";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { getTicketPayment, postPayment } from "@/controllers";
import { getTicketPaymentSchema, postPaymentBodySchema } from "@/schemas/payments-schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", validateQuery(getTicketPaymentSchema), getTicketPayment)
  .post("/process", validateBody(postPaymentBodySchema), postPayment);

export { paymentsRouter };
