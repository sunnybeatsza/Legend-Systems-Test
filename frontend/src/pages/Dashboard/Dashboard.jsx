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
      <Navbar />
      <h1>Dashboard</h1>
      <h2>Tasks</h2>
      <Link to="/CreateTask">Create Tasks</Link>
      {items.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due date</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.ID}>
                <td>{item.ID}</td>
                <td>{item.Taskname}</td>
                <td>{item.Description}</td>
                <td>{item.Status}</td>
                <td>{item.Due_date}</td>
                {/* Add more table cells for additional data */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
