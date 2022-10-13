export interface LoginDTO {
  username: string;
  password: string;
}

export interface UserDTO {
  _id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
}

export interface TicketLot {
  _id: string;
  eventId: string;
  type: string;
  date: string;
  price: number;
  qtdTotal: number;
  qtdAvailable: number;
  qtdSold: number;
}



export interface Ticket {
  _id: string;
  eventId: string;
  clientId: string;
  type: string;
  dateEvent: string;
  price: number;
  ticketLotI: string;
  code: string;
  status: string;
}

export interface TicketsReservation {
  ticketLotId: string;
  type: string;
  totalTicketReserved: number;
  price: number;
  _id: string;
}

interface CartItem {
  _id?: any;
  total: number;
  paymentMethod: string;
  ticketsReservation: TicketsReservation[];
}

export interface Order {
  dateEvent: string;
  total: number;
  paymentMethod: string;
  ticketsReservation: TicketsReservation[];
}


// const initalStateCard = {
//   total: 0,
//   ticketsReservation: []
// }