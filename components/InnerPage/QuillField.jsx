import React from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillField = ({ label, name, placeholder, disabled }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <div className="mb-3">
      <div className="grid">
        <label className="text-black font-[500] mb-1" htmlFor={name}>
          {label}
        </label>
        <ReactQuill
          style={{ height: 200, overflowY: "auto" }}
          value={values[name]}
          onChange={(content) => {
            setFieldValue(name, content);
          }}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default QuillField;
