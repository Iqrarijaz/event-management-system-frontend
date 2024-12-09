import React, { useEffect, useRef } from "react";
import { Button, Modal } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Loading from "@/animations/homePageLoader";
import FormField from "@/components/InnerPage/FormField";
import DescriptionField from "@/components/InnerPage/DescriptionField";
import SelectField from "@/components/InnerPage/SelectField";
import { UPDATE_EVENT } from "@/apis/events";
import DateTimeField from "@/components/InnerPage/DateInput";

// Validation schema for Formik
const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  rawMaterialsUsed: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date cannot be before start date")
    .required("Required"),
  productionStatus: Yup.string().required("Required"),
});

const initialValues = {
  productName: "",
  rawMaterialsUsed: "",
  startDate: "",
  endDate: "",
  productionStatus: "",
};

function EditEventModal({ isModalOpen, setIsModalOpen }) {
  const { name, state, record } = isModalOpen;
  const formikRef = useRef(null);
  const queryClient = useQueryClient();

  // Populate form values with formatted date
  useEffect(() => {
    if (record) {
      const {
        id,
        productName,
        rawMaterialsUsed,
        startDate,
        endDate,
        productionStatus,
      } = record;

      formikRef.current?.setValues({
        id,
        productName,
        rawMaterialsUsed,
        startDate: startDate
          ? new Date(startDate).toISOString().slice(0, 16)
          : "",
        endDate: endDate ? new Date(endDate).toISOString().slice(0, 16) : "",
        productionStatus,
      });
    }
  }, [record]);

  // Mutation for updating the production task
  const updateProductionTask = useMutation({
    mutationKey: ["updateProductionTask"],
    mutationFn: async (values) => await UPDATE_EVENT(values),
    onSuccess: (data) => {
      setIsModalOpen({ name: null, state: false });
      queryClient.invalidateQueries(["productionTaskList"]);
      formikRef.current?.resetForm();
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error);
    },
  });

  // Close modal and reset form
  const handleModalCancel = () => {
    setIsModalOpen({ name: null, state: false });
    formikRef.current?.resetForm();
  };

  return (
    <Modal
      className="!rounded-sm"
      centered
      width={600}
      open={name === "edit" && state === true}
      closeIcon={false}
      footer={null}
    >
      <div>
        <div className="mb-4 flex justify-between">
          <h1 className="inner-page-title text-3xl text-black">
            Update Production Task
          </h1>
        </div>

        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => updateProductionTask.mutate(values)}
        >
          {({ errors, values }) => (
            <Form className="bg-gray-100 p-6 rounded-sm overflow-y-auto">
              {updateProductionTask.isLoading && <Loading />}

              {/* Form Fields */}
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
                placeholder="Select start date and time"
              />
              <DateTimeField
                label="End Date and Time"
                name="endDate"
                placeholder="Select end date and time"
              />

              {/* Action Buttons */}
              <div className="flex justify-end mt-8 gap-6">
                <Button onClick={handleModalCancel} className="cancel-button">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="apply-button"
                >
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default EditEventModal;
