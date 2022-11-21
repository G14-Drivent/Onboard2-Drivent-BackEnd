import { prisma } from "@/config";
import { CreateTicketParams } from "@/protocols";

async function findManyTypes() {
  return prisma.ticketType.findMany();
}

async function findOneByEnrollment(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    }
  });
}

async function findOneById(id: number) {
  return prisma.ticket.findUnique({
    where: { id },
    include: {
      TicketType: true,
    }
  });
}

async function upsert(id: number, params: Pick<CreateTicketParams, "enrollmentId" | "status" | "ticketTypeId">) {
  return prisma.ticket.upsert({
    where: {
      id
    },
    create: params,
    update: {
      id,
      ...params
    }
  });
}

const ticketsRepository = {
  findManyTypes,
  findOneByEnrollment,
  findOneById,
  upsert
};

export default ticketsRepository;
