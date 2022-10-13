import { api } from "./api";

const findByEventId = async (id: any) => {
    const { data }: any = await api.get(`ticket-lot/findbyeventid/${id}`);
    return data;
}

const findByTicketLotId = async (id: any) => {
    const { data }: any = await api.get(`ticket-lot/findbyticketlotid/${id}`);
    return data;
}

const findByClientId = async (id: any) => {
    const { data }: any = await api.get(`tickets/findbyclientid/${id}`);
    return data;
}

const findByClientIdTicketId = async (id: any) => {
    const { data }: any = await api.get(`tickets/findbyclientidticketid/${id}`);
    return data;
}

const TicketService = {
    findByEventId,
    findByTicketLotId,
    findByClientId,
    findByClientIdTicketId
}

export default TicketService;