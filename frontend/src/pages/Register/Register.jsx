import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      passWord: "",
    },
    onSubmit: async (values) => {
      try {
        // Display form values for testing purposes
        alert(JSON.stringify(values, null, 2));
        // Make a POST request to create a new user with the provided values
        const response = await axios.post(
          "http://localhost:8080/users",
          values
        );
        alert("You have successfully registered!");
        navigate("/");
        // Handle the response or perform additional actions
      } catch (error) {
        console.error("Error creating User:", error);

        if (error.response) {
          const { data } = error.response;

          if (data.error === "Invalid content type") {
            alert("Invalid content type. Only JSON is supported.");
          } else if (data.error === "Email is required") {
            alert("Email is required.");
          } else if (data.error === "Invalid email") {
            alert("Invalid email. Must end with @gmail.com.");
          } else if (data.error === "Invalid task description") {
            alert("Invalid task description. Cannot exceed 10 characters.");
          } else {
            alert("An unexpected error occurred.");
          }
        } else {
          alert("An unexpected error occurred.");
        }
      }
    },
  });

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
