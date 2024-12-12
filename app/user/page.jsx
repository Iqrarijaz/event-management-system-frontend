"use client";
import React from "react";
import EventContextProvider, { useEventContext } from "@/context/EventContext";
import EventCard from "./_Components/EventCard";
import SearchInput from "@/components/InnerPage/SearchInput";

function UserPage() {
  const { eventListForUser } = useEventContext();
  const events = eventListForUser?.data?.data || []; // Safely access event data

  return (
    <div className="p-6 h-screen overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 main-app-header bg-white flex items-center justify-between px-4 py-2 mb-4 shadow-md">
        <h2 className="font-bold text-xl text-gray-800">Welcome User</h2>
      </div>

      {/* Search Input */}
      <div className="mb-4 flex justify-center sm:justify-end">
        <div className="w-[300px]">
          <SearchInput setFilters={() => {}} />
        </div>
      </div>

      {/* Event Cards or No Event Found */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} {...event} />)
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No events found.
          </div>
        )}
      </div>
    </div>
  );
}

export default function ParentWrapper() {
  return (
    <EventContextProvider>
      <UserPage />
    </EventContextProvider>
  );
}
