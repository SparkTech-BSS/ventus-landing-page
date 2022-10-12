import { useQuery } from "@tanstack/react-query";
import EventService from "services/EventService";

export function useEvents() {
  return useQuery(['events'], EventService.findAll);
};

