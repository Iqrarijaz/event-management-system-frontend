"use client";
import React, { createContext, useContext, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  GET_EVENT_CARDS,
  LIST_EVENTS,
  LIST_EVENTS_FOR_USER,
} from "@/apis/events";

const userData = JSON.parse(localStorage.getItem("userData"));
export const eventContext = createContext();
export const useEventContext = () => useContext(eventContext);

function EventContextProvider({ children }) {
  const [filters, setFilters] = useState({
    limit: 10,
    currentPage: 1,
    search: null,
    sortingKey: "_id",
    onChangeSearch: false,
  });

  const debouncedFilters = useDebounce(
    filters,
    filters?.onChangeSearch ? 1000 : 0
  );

  // Helper function to streamline useQuery configurations
  const createQuery = (key, queryFn, enabled = true) =>
    useQuery({
      queryKey: key,
      queryFn,
      enabled,
      onError: (error) => {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong. Please try again later.");
      },
    });

  const eventList = createQuery(
    ["eventList", JSON.stringify(debouncedFilters)],
    () => LIST_EVENTS(debouncedFilters),
    !!userData
  );

  const eventListForUser = createQuery(
    ["eventListForUser"],
    LIST_EVENTS_FOR_USER
  );

  const eventCards = createQuery(["eventCards"], GET_EVENT_CARDS, !!userData);

  const onChange = (data) => setFilters((prev) => ({ ...prev, ...data }));

  return (
    <eventContext.Provider
      value={{
        filters,
        eventList,
        eventListForUser,
        eventCards,
        setFilters,
        onChange,
      }}
    >
      {children}
    </eventContext.Provider>
  );
}

export default EventContextProvider;
