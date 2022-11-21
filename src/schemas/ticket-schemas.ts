import { CreateTicketBody } from "@/protocols";
import Joi from "joi";

export const createTicketSchema = Joi.object<CreateTicketBody>({
  ticketTypeId: Joi.number().required()
});
