"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { DELETE_EVENT } from "@/apis/events";
import Loading from "@/animations/homePageLoader";

function DeleteEventModal({ isModalOpen, setIsModalOpen }) {
  const queryClient = useQueryClient();
  const { record, name, state } = isModalOpen;

  // State for password input
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  // Mutation for deleting the event
  const deleteMutation = useMutation({
    mutationKey: ["deleteMutation"],
    mutationFn: async (values) => {
      return await DELETE_EVENT(values);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["eventList"]);
      toast.success(data?.message);
      setIsModalOpen({
        name: null,
        state: false,
        record: null,
      });
      setPassword(""); // Clear the password field
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error?.response?.data?.error || "Failed to delete the event."
      );
    },
  });

  // Function to close the modal
  function handleModalCancel() {
    setIsModalOpen({
      name: null,
      state: false,
      record: null,
    });
    setPassword(""); // Reset the password field
    setErrors(""); // Clear errors
  }

  // Function to handle delete mutation
  function handleDeleteMutation() {
    if (!password) {
      setErrors("Password is required to delete the event.");
      return;
    }

    deleteMutation.mutate({
      _id: record?._id,
      password,
    });
  }

  return (
    <Modal
      title="Delete Event"
      className="!rounded-sm"
      centered
      width={600}
      open={name === "delete" && state === true}
      closeIcon={false}
      footer={false}
      onCancel={handleModalCancel}
    >
      <div className="mb-6 relative">
        <p>
          Are you sure you want to delete
          <span className="font-bold capitalize"> {record?.name}</span>?
        </p>
        {deleteMutation?.status === "loading" && <Loading />}
        <div className="mt-4">
          <label className="block mb-2">Enter password to confirm</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(""); // Clear errors on input
            }}
            placeholder="Enter password to confirm"
            className="w-full p-2 border rounded"
          />
          {errors && <p className="text-red-500">{errors}</p>}
        </div>
      </div>
      <div className="flex justify-end gap-6">
        <Button className="cancel-button" onClick={handleModalCancel}>
          Cancel
        </Button>
        <Button
          className="apply-button"
          onClick={handleDeleteMutation}
          disabled={deleteMutation?.status === "loading"}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteEventModal;
