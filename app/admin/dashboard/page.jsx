"use client";
import React, { useState } from "react";
import MetricsCard from "./_Components/Cards/MetricsCard";
import { Col, Row } from "antd";
import AddButton from "@/components/InnerPage/AddButton";
import AddEventModal from "./_Components/AddEventModal";
import EditEventModal from "./_Components/EditEventModal";
import DeleteEventModal from "./_Components/DeleteEventModal";
import EventsTable from "./_Components/Table";
import EventContextProvider from "@/context/EventContext";

function Dashboard() {
  const cardsData = [
    {
      title: "Total Task",
      amount: "10",
      // percentage: "0",
      // percentageColor: "text-green-600 bg-green-100",
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
      title: "Schedule Task",
      amount: "5",
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
      title: "Completed Task",
      amount: "3",
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
  return (
    <div className="p-8 h-screen overflow-y-scroll scroll-bar">
      <div className="sticky main-app-header bg-white flex items-center justify-between px-4 mb-4">
        <h2>Event Management System</h2>
        <AddButton
          title="Add Task"
          onClick={() => setIsModalOpen({ name: "add", state: true })}
        />
      </div>
      <div className="">
        <Row className="" gutter={[16, 16]}>
          {cardsData.map((card, index) => (
            <Col xs={24} md={12} xl={8} key={index}>
              <MetricsCard
                key={index + Math.random()}
                title={card.title}
                amount={card.amount}
                percentage={card.percentage}
                percentageColor={card.percentageColor}
                data={card.data}
              />
            </Col>
          ))}
        </Row>
        <div className="flex flex-col mt-4 justify-end">
          <EventsTable
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>

      <AddEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <EditEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <DeleteEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default function ParentWrapper() {
  return (
    <EventContextProvider>
      <Dashboard />
    </EventContextProvider>
  );
}
