import { TicketLotDTO } from "./TicketLotDTO";
import { CheckedState } from "@radix-ui/react-checkbox";

export interface EventDTO {
    name: string;
    location: string;
    geolocation?: string;
    ticketsLot: TicketLotDTO[];
    category: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    images: string;
    organizerName: string;
    about?: string;
    acceptResponsibility?: CheckedState;
    isPublic: boolean;
    isDraft: boolean;
    absorbRate?: boolean;
    province: string;
}