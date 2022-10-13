import { useQuery } from "@tanstack/react-query";
import TicketService from "services/TicketService";

export function useTicketByEventId(id: string | any) {
  return useQuery(["ticketEventId"], () => TicketService.findByEventId(id));
}

export function useTicketByLotId(id: string | any) {
  return useQuery(["ticketLotId"], () => TicketService.findByTicketLotId(id));
}

export function useTicketByClientId(id: string | any) {
  return useQuery(["ticketClientId"], () => TicketService.findByClientId(id));
}

export function useTicketClientByTicketId(id: string | any) {
  return useQuery(["ticketClientTicketId"], () => TicketService.findByClientIdTicketId(id));
}


