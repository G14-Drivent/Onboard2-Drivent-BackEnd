import { AuthenticatedRequest } from "@/middlewares";
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
    if(error.name === "NotFoundError") return res.send(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.send(httpStatus.UNAUTHORIZED);
  }
}
