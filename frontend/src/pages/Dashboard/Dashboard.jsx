import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./DashBoard.css"; // Import the CSS file
import { useContext } from "react";
import { UsernameContext } from "../../App";

export const Dashboard = () => {
  // State to store the list of tasks
  const [items, setItems] = useState([]);

  // Context to get the current userName
  const { userName } = useContext(UsernameContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the server to retrieve to-do list items for the specific user
        const response = await axios.get(`http://localhost:8080/getTasks`);
        // Update the state with the retrieved data
        setItems(response.data.tasks);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []); // Include userName in the dependency array to re-fetch data when userName changes
  console.log(items);

  return (
    <div>
      {/* Navbar component */}
      <Navbar />
      <h1>Dashboard</h1>
      <h2>Tasks</h2>
      {/* Link to the CreateTask page */}
      <Link to="/CreateTask">Create Tasks</Link>

      {/* Table to display tasks */}
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Operations</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {items.map((item) =>
            // Map through the tasks and create table rows
            item.Items.map((task, index) => (
              <tr key={item._id + index}>
                <td>{task}</td>
                <td>
                  {/* Links to the EditTask and DeleteTask pages with task ID */}
                  <Link to={`/EditTask/${task}`}>Edit</Link>
                  <Link to={`/DeleteTask/${task}`}>Delete</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
