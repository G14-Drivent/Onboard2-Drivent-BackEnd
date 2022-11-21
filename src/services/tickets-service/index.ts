import { notFoundError } from "@/errors";
import { CreateTicketParams } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType } from "@prisma/client";
import enrollmentsService from "../enrollments-service";

async function getAllTicketTypes(): Promise<TicketType[]> {
  const types = await ticketsRepository.findManyTypes();
  return types;
}

async function getTicketByUser(userId: number): Promise<Ticket & { TicketType: TicketType }> {
  const { id } = await enrollmentsService.getOneWithAddressByUserId(userId);

  const ticket = await ticketsRepository.findOneByEnrollment(id);
  if(!ticket) throw notFoundError();

  return ticket;
}

async function getTicketById(id: number): Promise<Ticket & { TicketType: TicketType }> {
  const ticket = await ticketsRepository.findOneById(id);
  if(!ticket) throw notFoundError();

  return ticket;  
}

async function createTicket(params: Pick<CreateTicketParams, "ticketTypeId" | "userId">): Promise<Ticket> {
  const { ticketTypeId, userId } = params;
  
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);  
  const { id } = await ticketsRepository.upsert(0, {
    enrollmentId: enrollment.id,
    ticketTypeId,
    status: "RESERVED"
  });

  const ticket = await getTicketById(id);
  return ticket;
}

const ticketsService = {
  getAllTicketTypes,
  getTicketByUser,
  getTicketById,
  createTicket
};
  
export default ticketsService;
