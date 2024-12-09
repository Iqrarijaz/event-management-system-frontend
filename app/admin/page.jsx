"use client";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

function AdminPage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    window.location.href = "/admin/dashboard";
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLoginSubmit = (values) => {
    console.log("Logging in with values: ", values);
    localStorage.setItem("userData", JSON.stringify(values));
  };

  return (
    <div className="flex items-center justify-center h-screen p-6 bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLoginSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="w-full p-2 border rounded"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="w-full p-2 border rounded"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminPage;
