export interface TicketLotDTO {
  _id?: string;
  eventId?: string;
  type: string;
  date?: string | Date;
  price: number;
  qtdTotal: number;
  qtdAvailable?: number;
  qtdSold?: number;
  startDate?: string | Date;
  endDate?: string | Date;
  startTime?: string;
  endTime?: string;
  id?: string;
  qtdTotalPerUser: number;
}
