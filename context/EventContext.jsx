"use client";

import { LIST_EVENTS } from "@/apis/events";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const { createContext, useState, useContext } = require("react");

export const eventContext = createContext();
export const useEventContext = () => useContext(eventContext);

function EventContextProvider({ children }) {
  const [filters, setFilters] = useState({
    itemsPerPage: 10,
    currentPage: 1,
    search: null,
    sortOrder: -1,
    sortingKey: "_id",
    onChangeSearch: false,
    advance: null,
  });

  const debFilter = useDebounce(filters, filters?.onChangeSearch ? 1000 : 0);
  const eventList = useQuery({
    queryKey: ["eventList", JSON.stringify(debFilter)],
    queryFn: async () => {
      return await LIST_EVENTS(debFilter);
    },
    enabled: true,
    onError: (error) => {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong. Please try again later.");
    },
  });

  function onChange(data) {
    setFilters((old) => ({ ...old, ...data }));
  }

  return (
    <eventContext.Provider
      value={{ filters, eventList, setFilters, onChange }}
    >
      {children}
    </eventContext.Provider>
  );
}

export default EventContextProvider;
