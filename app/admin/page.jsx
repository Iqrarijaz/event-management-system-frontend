"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { LOGIN, REGISTER } from "@/apis/login";
import { toast } from "react-toastify";

function AdminPage() {
  const [currentState, setCurrentState] = useState("login"); // "login" or "register"

  const initialValues = {
    email: "",
    password: "",
    name: currentState === "register" ? "" : undefined, // Only needed for register
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    window.location.href = "/admin/dashboard";
  }

  const validationSchema = Yup.object().shape({
    name:
      currentState === "register"
        ? Yup.string().required("Name is required")
        : null,
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const loginMutation = useMutation({
    mutationFn: LOGIN,
  });

  const registerMutation = useMutation({
    mutationFn: REGISTER,
  });

  function handleLoginSubmit(values, { setSubmitting }) {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem("userData", JSON.stringify(data?.data));
        window.location.href = "/admin/dashboard";
        toast.success("Login successful");
      },
      onError: (error) => {
        toast.error("Invalid email or password");
        console.error("Invalid email or password", error);
        setSubmitting(false);
      },
    });
  }

  function handleRegisterSubmit(values, { setSubmitting }) {
    registerMutation.mutate(
      { ...values, role: "admin" },
      {
        onSuccess: (data) => {
          message.success("Registration successful, please login.");
          setCurrentState("login");
        },
        onError: (error) => {
          console.error("Registration failed", error);
          setSubmitting(false);
          message.error("Registration failed");
        },
      }
    );
  }

  return (
    <div className="flex items-center justify-center h-screen p-6 bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {currentState === "login" ? "Admin Login" : "Admin Register"}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={
            currentState === "login" ? handleLoginSubmit : handleRegisterSubmit
          }
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
              {currentState === "register" && (
                <div>
                  <label className="block mb-2 flex">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="w-full p-2 border rounded"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 flex">{errors.name}</p>
                  )}
                </div>
              )}
              <div>
                <label className="block mb-2 flex">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="w-full p-2 border rounded"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 flex">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block mb-2 flex">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="w-full p-2 border rounded"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 flex">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                {currentState === "login" ? "Login" : "Register"}
              </button>
              {currentState === "login" ? (
                <a
                  href="#"
                  onClick={() => setCurrentState("register")}
                  className="text-blue-600 underline"
                >
                  Don't have an account? Register
                </a>
              ) : (
                <a
                  href="#"
                  onClick={() => setCurrentState("login")}
                  className="text-blue-600 underline"
                >
                  Already have an account? Login
                </a>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminPage;
