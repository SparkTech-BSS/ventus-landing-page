import { useQuery } from "@tanstack/react-query";
import EventService from "services/EventService";

export function useEvents() {
  return useQuery(["events"], EventService.findAll);
}

export function useEventById(id: string | any) {
  return useQuery(["eventById"], () => EventService.findById(id));
}

export function useEventsByName(searchedName: string | any) {
  return useQuery(["eventsByName"], () =>
    EventService.findByName(searchedName)
  );
}

export function useEventsByDate(searchedDate: string | Date) {
  return useQuery(["eventsByDate"], () =>
    EventService.findByDate(searchedDate)
  );
}

export function useEventsByCategory(searchedCategory: string | Date) {
  return useQuery(["eventsByDate"], () =>
    EventService.findByDate(searchedCategory)
  );
}


