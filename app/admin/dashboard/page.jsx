"use client";
import React, { useState } from "react";
import MetricsCard from "./_Components/Cards/MetricsCard";
import { Col, Row, Button } from "antd";
import AddButton from "@/components/InnerPage/AddButton";
import AddEventModal from "./_Components/AddEventModal";
import EditEventModal from "./_Components/EditEventModal";
import DeleteEventModal from "./_Components/DeleteEventModal";
import EventsTable from "./_Components/Table";
import EventContextProvider, { useEventContext } from "@/context/EventContext";
import DropdownFilter from "./_Components/DropdownFilter";
import { useRouter } from "next/navigation";

function EventPage() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { eventCards } = useEventContext();
  const router = useRouter(); // Initialize router for redirection

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userData"); // Clear user data from local storage
    router.push("/admin"); // Redirect to the admin page
  };

  const cardsData = [
    {
      title: "Total Events",
      amount:
        (eventCards?.data?.data?.ongoing || 0) +
        (eventCards?.data?.data?.completed || 0),
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            fill: "origin",
            backgroundColor: "rgba(253, 244, 255, 1)",
            borderColor: "rgba(232, 121, 249, 1)",
            tension: 0.3,
            borderWidth: 2,
            data: [1, 3, 2, 5, 4, 5, 7],
          },
        ],
      },
    },
    {
      title: "Ongoing Events",
      amount: eventCards?.data?.data?.ongoing || "0",
      percentage: "2.5",
      percentageColor: "text-red-600 bg-red-100",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            fill: "origin",
            backgroundColor: "rgba(236, 254, 255, 1)",
            borderColor: "rgba(34, 211, 238, 1)",
            tension: 0.3,
            borderWidth: 2,
            data: [1, 5, 4, 5, 3, 6, 3],
          },
        ],
      },
    },
    {
      title: "Completed Events",
      amount: eventCards?.data?.data?.completed || "0",
      percentage: "2.2",
      percentageColor: "text-green-600 bg-green-100",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            fill: "origin",
            backgroundColor: "rgba(236, 253, 245, 1)",
            borderColor: "rgba(52, 211, 153, 1)",
            tension: 0.3,
            borderWidth: 2,
            data: [1, 5, 2, 5, 3, 7, 6],
          },
        ],
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState({
    name: null,
    state: false,
    record: null,
  });

  const modalComponents = {
    add: AddEventModal,
    edit: EditEventModal,
    delete: DeleteEventModal,
  };

  const renderModal = () => {
    if (!isModalOpen.name) return null;
    const ModalComponent = modalComponents[isModalOpen.name];
    return (
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    );
  };

  return (
    <div className="p-8 h-screen overflow-y-scroll scroll-bar">
      <div className="sticky main-app-header bg-white flex items-center justify-between px-4 mb-4">
        <h2>
          <span className="font-bold">Welcome {userData?.user?.name}</span>
        </h2>

        {/* Logout Button */}
        <Button onClick={handleLogout} className="add-button">
          Logout
        </Button>
      </div>
      <div>
        <Row gutter={[16, 16]}>
          {cardsData.map((card, index) => (
            <Col xs={24} md={12} xl={8} key={card.title}>
              <MetricsCard {...card} />
            </Col>
          ))}
        </Row>
        <div className="w-full flex justify-end mt-4 gap-4">
          <DropdownFilter />
          <AddButton
            title="Add Task"
            onClick={() => setIsModalOpen({ name: "add", state: true })}
          />
        </div>
        <div className="flex flex-col mt-2 justify-end">
          <EventsTable
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
      {renderModal()}
    </div>
  );
}

export default function ParentWrapper() {
  return (
    <EventContextProvider>
      <EventPage />
    </EventContextProvider>
  );
}
