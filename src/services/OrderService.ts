import { api } from "./api";

const findByIdUserId = async (id: any) => {
  const { data }: any = await api.get(`orders/findbyiduserid/${id}`);
  return data;
};

const findByStatusUserId = async (status: any) => {
    const { data }: any = await api.get(`orders/findbystatususerid/${status}`);
    return data;
}

const OrderService = {
    findByIdUserId,
    findByStatusUserId
}

export default OrderService;