import Loading from "@/animations/homePageLoader";
import { Button, Modal } from "antd";
import React, { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormField from "@/components/InnerPage/FormField";
import DescriptionField from "@/components/InnerPage/DescriptionField";
import { CREATE_EVENT } from "@/apis/events";
import SelectField from "@/components/InnerPage/SelectField";
import DateTimeField from "@/components/InnerPage/DateInput";

// Validation schema using Yup for Formik
const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  rawMaterialsUsed: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().optional(),
  productionStatus: Yup.string().required("Required"),
});

// Initial values for the form fields
const initialValues = {
  productName: "",
  rawMaterialsUsed: "",
  startDate: "",
  endDate: "",
  productionStatus: "",
};

function AddEventModal({ isModalOpen, setIsModalOpen }) {
  // Destructuring props to get name and state from isModalOpen
  const { name, state } = isModalOpen;

  // Ref for accessing Formik methods imperatively
  const formikRef = useRef(null);

  const queryClient = useQueryClient();
  // React Query hook for handling mutation (createProductionTask)
  const createProductionTask = useMutation({
    mutationKey: ["createProductionTask"],
    mutationFn: async (values) => {
      return await CREATE_EVENT(values); // Assuming CREATE_ROLE is a function that sends a request
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(["eventList"]);
      setIsModalOpen({
        name: null,
        state: false,
      });
      formikRef.current.resetForm();
      toast.success(data?.message); // Show success toast if mutation succeeds
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.error); // Show error toast if mutation fails
    },
  });

  // Function to handle modal cancel action
  function handleModalCancel() {
    try {
      // Close the modal by setting isModalOpen to false
      setIsModalOpen({
        name: null,
        state: false,
      });

      // Reset the form
      formikRef.current.resetForm();
    } catch (error) {
      console.log({ error });
    }
  }

  // Function to handle form submission
  function handleSubmit(values) {
    try {
      createProductionTask.mutate(values); // Trigger the mutation with form values
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Modal
      className="!rounded-sm"
      centered
      width={600}
      open={name === "add" && state === true} // Control modal open state based on props
      closeIcon={false}
      footer={false}
    >
      <div>
        <div className="mb-4 flex justify-between">
          <h1 className="inner-page-title text-3xl text-black p-0">
            Add Production Task
          </h1>
          <Button
            className="reset-button"
            onClick={() => formikRef.current.resetForm()} // Reset form using Formik ref
          >
            Reset Form
          </Button>
        </div>

        {/* Formik wrapper for handling form state and validation */}
        <Formik
          innerRef={formikRef} // Assign ref to Formik for imperative form access
          initialValues={initialValues} // Initial form values
          validationSchema={validationSchema} // Validation rules defined using Yup
          onSubmit={handleSubmit} // Function to handle form submission
        >
          {({ errors, values, touched, setFieldValue }) => (
            console.log({ errors, values }),
            (
              <div className=" ">
                <Form>
                  <div className="form-class mx-auto gap-6 relative  bg-gray-100 p-6 rounded-sm overflow-y-auto">
                    {/* Show loading animation if mutation is in progress */}
                    {createProductionTask?.status === "loading" && <Loading />}

                    <div className="">
                      {/* Custom form fields using reusable components */}
                      <FormField label="Product Name" name="productName" />
                      <DescriptionField
                        label="Raw Materials Used"
                        name="rawMaterialsUsed"
                      />
                      <SelectField
                        label="Production Status"
                        name="productionStatus"
                        options={[
                          { value: "Scheduled", label: "Scheduled" },
                          { value: "In Progress", label: "In Progress" },
                          { value: "Completed", label: "Completed" },
                        ]}
                      />
                      <DateTimeField
                        label="Start Date and Time"
                        name="startDate"
                        placeholder="Select date and time"
                        disabled={false}
                      />

                      <DateTimeField
                        label="End Date and Time"
                        name="endDate"
                        placeholder="Select date and time"
                        disabled={false}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-8 gap-6">
                    <Button
                      onClick={handleModalCancel}
                      className="cancel-button"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="apply-button"
                    >
                      Add
                    </Button>
                  </div>
                </Form>
              </div>
            )
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default AddEventModal;
