import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { UsernameContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const CreateTask = () => {
  // Access the navigate function from React Router
  const navigate = useNavigate();

  // Get the current username from the context
  const { userName } = useContext(UsernameContext);

  // Initialize useFormik hook to manage form state and validation
  const formik = useFormik({
    initialValues: {
      Taskname: "",
      Description: "",
      Status: "",
      Due_date: "",
    },
    // Handle form submission
    onSubmit: async (values) => {
      try {
        // Display form values in an alert for testing purposes
        alert(JSON.stringify(values, null, 2));

        // Send a POST request to the server to update the task list
        const response = await axios.post(
          "http://localhost:8080/tasks",
          values
        );

        // Display success message
        alert("Task successfully added!");

        // Navigate to the dashboard page
        navigate("/dashboard");
      } catch (error) {
        console.error("Error create Task:", error);

        // Handle different types of errors
        if (error.response) {
          const { data } = error.response;

          if (data.error === "Invalid content type") {
            alert("Invalid content type. Only JSON is supported.");
          } else if (data.error === "Invalid task description") {
            alert("Invalid task description. Cannot exceed 140 characters.");
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
      <h1>Create Task</h1>
      {/* Form for creating a new task */}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="Taskname">Taskname</label>
        <input
          id="Taskname"
          name="Taskname"
          type="text" // corrected from "textfield"
          onChange={formik.handleChange}
          value={formik.values.Taskname}
        />

        <label htmlFor="Description">Description</label>
        <input
          id="Description"
          name="Description"
          type="text" // corrected from "textfield"
          onChange={formik.handleChange}
          value={formik.values.Description}
        />

        <label htmlFor="Status">Status</label>
        <input
          id="Status"
          name="Status"
          type="text" // corrected from "textfield"
          onChange={formik.handleChange}
          value={formik.values.Status}
        />

        <label htmlFor="Due_date">Due date</label>
        <input
          id="Due_date"
          name="Due_date"
          type="date" // corrected from "textfield"
          onChange={formik.handleChange}
          value={formik.values.Due_date}
        />

        {/* Submit button for the form */}
        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
};
