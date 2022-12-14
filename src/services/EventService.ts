import { api } from "./api";

const findAll = async () => {
  const { data }: any = await api.get("events/findall");
  return data;
};

const findById = async (id: any) => {
  const { data }: any = await api.get(`events/findbyid/${id}`);
  return data;
};

const findByName = async (name: string | any) => {
  const { data }: any = await api.get(`events/findbyname/${name}`);
  return data;
};

const findByDate = async (date: string | Date) => {
  const { data }: any = await api.get(`events/findbydate/${date}`);
  return data;
};

const findByCategory = async (category_id: string) => {
  const { data }: any = await api.get(`events/findbycategory/${category_id}`);
  return data;
};

const EventService = {
  findAll,
  findById,
  findByName,
  findByDate,
  findByCategory,
};

export default EventService;
