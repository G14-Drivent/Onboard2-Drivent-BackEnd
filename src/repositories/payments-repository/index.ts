import { prisma } from "@/config";

async function findFirstByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

const paymentsRepository = {
  findFirstByTicket  
};
  
export default paymentsRepository;
