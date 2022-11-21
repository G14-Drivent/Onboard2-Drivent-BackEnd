import { GetTicketPaymentQuery, PaymentInput } from "@/protocols";
import Joi from "joi";

export const getTicketPaymentSchema = Joi.object<GetTicketPaymentQuery>({
  ticketId: Joi.number().required()
});

export const postPaymentBodySchema = Joi.object<PaymentInput>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.required(),
    cvv: Joi.number().required()
  }).required(),
});
