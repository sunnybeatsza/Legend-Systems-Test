import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UsernameContext } from "../../App";

export const DeleteTask = () => {
  // Get the current userName from context
  const { userName } = useContext(UsernameContext);

  // State to track the confirmation status
  const [confirmation, setConfirmation] = useState(false);

  // Get the task parameter from the URL
  const { task } = useParams();

  // Access the navigate function from React Router
  const navigate = useNavigate();

  // Log the task to the console
  console.log(task);

  // Function to handle task deletion
  const handleDelete = async () => {
    try {
      // Make a DELETE request to the server to remove the task
      await axios.delete(
        `http://localhost:8080/users/removeItem?userName=${userName}&Task=${task}`,
        {}
      );

      // Redirect to the dashboard or another page after deletion
      navigate("/dashboard");

      // Display a success message
      alert("Item Deleted!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <p>Delete Task</p>
      {/* Display a confirmation message */}
      <p>Are you sure you want to delete the task "{task}"?</p>

      {/* Button to confirm deletion */}
      <button onClick={() => setConfirmation(true)}>Confirm</button>

      {/* Display additional options if confirmation is true */}
      {confirmation && (
        <>
          <p>Confirming will permanently delete the task.</p>

          {/* Button to delete the task */}
          <button onClick={handleDelete}>Delete</button>

          {/* Button to cancel deletion */}
          <button onClick={() => setConfirmation(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};
