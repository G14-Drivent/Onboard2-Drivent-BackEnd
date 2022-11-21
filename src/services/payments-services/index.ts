import { unauthorizedError } from "@/errors";
import { CardData } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
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

async function createPayment({ userId, ticketId, cardData }: { userId: number, ticketId: number, cardData: CardData }): Promise<Payment> {
  const ticket = await ticketsService.getTicketById(ticketId);
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  
  if(ticket.enrollmentId !== enrollment.id) throw unauthorizedError();

  const payment = await paymentsRepository.create({
    ticketId: ticket.id,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: String(cardData.number).slice(-4)
  });

  await ticketsRepository.upsert(ticketId, {
    enrollmentId: enrollment.id,
    ticketTypeId: ticket.ticketTypeId,
    status: "PAID"
  });

  return payment;
}

const paymentsServices = {
  getPaymentByTicketId,
  createPayment
};

export default paymentsServices;
