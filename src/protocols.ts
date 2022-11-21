import { Ticket, TicketStatus } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type CreateTicketParams = {
  userId: number,
  ticketTypeId: number,
  status: TicketStatus,
  enrollmentId: number
};

export type CreateTicketBody = Pick<Ticket, "ticketTypeId">;

export type GetTicketPaymentQuery = {
  ticketId: number
};

export type PaymentInput = {
  ticketId: number,
	cardData: CardData
};

export type CardData = {
  issuer: string,
  number: number,
  name: string,
  expirationDate: Date,
  cvv: number
}

export type PaymentInsert = {
  ticketId: number,
  value: number,
  cardIssuer: string,
  cardLastDigits: string
}
