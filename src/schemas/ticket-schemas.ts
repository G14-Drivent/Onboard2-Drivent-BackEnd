import { CreateTicketBody, GetTicketPaymentQuery } from "@/protocols";
import Joi from "joi";

export const createTicketSchema = Joi.object<CreateTicketBody>({
  ticketTypeId: Joi.number().required()
});

export const getTicketPaymentSchema = Joi.object<GetTicketPaymentQuery>({
  ticketId: Joi.number().required()
});
