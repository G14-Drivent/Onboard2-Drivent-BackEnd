import { Router } from "express";
import { authenticateToken, validateQuery } from "@/middlewares";
import { getTicketPayment } from "@/controllers";
import { getTicketPaymentSchema } from "@/schemas/ticket-schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", validateQuery(getTicketPaymentSchema), getTicketPayment)
;
//  .post("/process", validateBody(Schema), postPayment);

export { paymentsRouter };
