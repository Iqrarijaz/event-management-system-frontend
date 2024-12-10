"use client";
import { Pagination, Table } from "antd";
import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import Loading from "@/animations/homePageLoader";
import { Switch } from "antd";
import { Skeleton } from "antd";

import { formatDate, formatDateWithTime } from "@/utils/date";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { CustomPopover } from "@/components/popHover";
import { popoverContent } from "@/components/popHover/popHoverContent";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { UPDATE_EVENT, UPDATE_PRODUCTION_TASK_STATUS } from "@/apis/events";
import { useEventContext } from "@/context/EventContext";

function EventsTable({ isModalOpen, setIsModalOpen }) {
  const queryClient = useQueryClient();
  const { eventList, onChange, setFilters } = useEventContext();

  // Mutation to update production status
  const updateStatusMutation = useMutation({
    mutationFn: async (record) => {
      return await UPDATE_EVENT(record);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["eventList"]);
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });

  // Handles the status update action
  function handleStatusUpdate(record, status) {
    updateStatusMutation.mutate({ _id: record._id, status });
  }

  // Generate custom action menu based on the current status
  function getActionMenu(record) {
    const { productionStatus } = record;

    const menu = [
      {
        heading: "Edit",
        icon: <FaEdit size={16} />,
        handleFunction: () =>
          setIsModalOpen({ name: "edit", state: true, record }),
      },
    ];

    if (productionStatus === "Ongoing") {
      menu.push({
        heading: "Completed",
        icon: <FaEdit size={16} />,
        handleFunction: () => handleStatusUpdate(record, "Completed"),
      });
    } else {
      menu.push({
        heading: "Ongoing",
        icon: <FaEdit size={16} />,
        handleFunction: () => handleStatusUpdate(record, "Ongoing"),
      });
    }

    menu.push({
      heading: "Delete",
      icon: <RiDeleteBin6Fill size={16} />,
      handleFunction: () =>
        setIsModalOpen({ name: "delete", state: true, record }),
    });

    return menu;
  }

  // Columns definition
  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (text) => (
        <div className="overflow-hidden flex-wrap capitalize">{text}</div>
      ),
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 220,
      render: (text) => (
        <div className="overflow-hidden whitespace-nowrap">
          {formatDateWithTime(text)}
        </div>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 220,
      render: (text) => (
        <div className="overflow-hidden whitespace-nowrap">
          {formatDateWithTime(text)}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 220,
      render: (text) => (
        <div className="overflow-hidden whitespace-nowrap">
          {formatDateWithTime(text)}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
      width: 140,
      render: (text, record) => (
        <div className="flex justify-center">
          {text === "Completed" ? (
            <div className="overflow-hidden flex-wrap capitalize bg-green-500 text-white px-2 py-1 rounded">
              {text}
            </div>
          ) : (
            <div className="overflow-hidden flex-wrap capitalize bg-red-500 text-white px-2 py-1 rounded">
              {text}
            </div>
          )}
        </div>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      align: "center",
      render: (record) => (
        <CustomPopover
          triggerContent={
            <HiOutlineDotsHorizontal
              size={34}
              className="hover:text-lightBlue"
            />
          }
          popoverContent={() => popoverContent(getActionMenu(record), record)} // Pass action menu based on record
        />
      ),
    },
  ];

  return (
    <>
      <Table
        responsive
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        key={Math.random()}
        className="antd-table-custom rounded-sm w-full scroll-bar"
        size="small"
        tableLayout="fixed"
        bordered
        scroll={{ x: 500 }}
        loading={{
          spinning:
            eventList?.status === "loading" ||
            updateStatusMutation?.status === "loading",
          indicator: <Skeleton active />,
        }}
        columns={columns}
        dataSource={eventList?.data?.data}
        pagination={false}
      />
      {/* Pagination */}
      <Pagination
        className="flex justify-end mt-4"
        pageSize={eventList?.data?.pageSize}
        total={eventList?.data?.totalRecord}
        current={eventList?.data?.currentPage}
        onChange={(page) => onChange({ currentPage: Number(page) })}
      />
    </>
  );
}

export default EventsTable;
