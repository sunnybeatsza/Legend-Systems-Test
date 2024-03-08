// EditTask.js
import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { UsernameContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";

export const EditTask = () => {
  // Access the navigate function from React Router
  const navigate = useNavigate();

  // Get the current userName from context
  const { userName } = useContext(UsernameContext);

  // Get the task parameter from the URL
  const { task } = useParams();

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

        // Send a POST request to the server to update the task
        const response = await axios.post(
          "http://localhost:8080//tasks/:taskId",
          values
        );

        // Display success message
        alert("Task successfully added!");

        // Navigate to the dashboard page
        navigate("/dashboard");
      } catch (error) {
        console.error("Error updating Task:", error);
      }
    },
  });

  return (
    <div>
      <h1>Edit Task</h1>
      {/* Form for editing a task */}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
