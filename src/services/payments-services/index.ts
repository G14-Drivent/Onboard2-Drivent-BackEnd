import { unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import { Payment } from "@prisma/client";
import enrollmentsService from "../enrollments-service";
import ticketsService from "../tickets-service";

async function getPaymentByTicketId(userId: number, ticketId: number): Promise<Payment> {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const ticket = await ticketsService.getTicketById(ticketId);

  if(ticket.enrollmentId !== enrollment.id) throw unauthorizedError();

  const payment = await paymentsRepository.findFirstByTicket(ticket.id);
  return payment;
}

const paymentsServices = {
  getPaymentByTicketId,
};

export default paymentsServices;
