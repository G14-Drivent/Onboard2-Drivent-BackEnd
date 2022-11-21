import { AuthenticatedRequest } from "@/middlewares";
import { PaymentInput } from "@/protocols";
import paymentsServices from "@/services/payments-services";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = Number(req.query.ticketId);

  try {
    const payment = await paymentsServices.getPaymentByTicketId(userId, ticketId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body as PaymentInput;

  try {
    const payment = await paymentsServices.createPayment({ userId, ticketId, cardData });
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
