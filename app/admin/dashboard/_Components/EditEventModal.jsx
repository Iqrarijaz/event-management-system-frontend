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
  name: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date cannot be before start date")
    .required("Required"),
  description: Yup.string().required("Required"),
});

const initialValues = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  location: "",
};

function EditEventModal({ isModalOpen, setIsModalOpen }) {
  const { name, state, record } = isModalOpen;
  const formikRef = useRef(null);
  const queryClient = useQueryClient();

  // Populate form values with formatted date
  useEffect(() => {
    if (record) {
      const {
        _id,
        name,
        location,
        description,
        startDate,
        endDate,
      } = record;

      formikRef.current?.setValues({
        _id,
        name,
        location,
        description,
        startDate: startDate
          ? new Date(startDate).toISOString().slice(0, 16)
          : "",
        endDate: endDate ? new Date(endDate).toISOString().slice(0, 16) : "",
      });
    }
  }, [record]);

  // Mutation for updating the production task
  const updateEvent = useMutation({
    mutationKey: ["updateEvent"],
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
            Update Event
          </h1>
        </div>

        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => updateEvent.mutate(values)}
        >
          {({ errors, values }) => (
            <Form className="bg-gray-100 p-6 rounded-sm overflow-y-auto">
              {updateEvent.isLoading && <Loading />}

              <div className="">
                {/* Custom form fields using reusable components */}
                <FormField label="Event Name" name="name" />
                <FormField label="Event Location" name="location" />

                <DescriptionField label="Description" name="description" />

                <DateTimeField
                  label="Start Date"
                  name="startDate"
                  placeholder="Select start date"
                  disabled={false}
                />

                <DateTimeField
                  label="End Date"
                  name="endDate"
                  placeholder="Select end date"
                  disabled={false}
                />
              </div>
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
