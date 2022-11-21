import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketTypes, getTicket, postNewTicket } from "@/controllers";
import { createTicketSchema } from "@/schemas/tickets-schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicket)
  .post("/", validateBody(createTicketSchema), postNewTicket);

export { ticketsRouter };
