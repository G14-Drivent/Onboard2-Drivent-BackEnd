import { prisma } from "@/config";
import { PaymentInsert } from "@/protocols";

async function findFirstByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function create(data: PaymentInsert) {
  return prisma.payment.create({
    data
  });
}

const paymentsRepository = {
  findFirstByTicket,
  create
};
  
export default paymentsRepository;
