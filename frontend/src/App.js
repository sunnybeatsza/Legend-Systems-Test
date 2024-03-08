// Import necessary libraries and components
import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { CreateTask } from "./pages/CreateTask/CreateTask";
import { DeleteTask } from "./pages/DeleteTask/DeleteTask";
import { EditTask } from "./pages/EditTask/EditTask";

// Create context providers for login and username
export const LoginContext = createContext();
export const UsernameContext = createContext();

// Define the main App component
function App() {
  // Initialize state for login status and username
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Render the App component
  return (
    // Provide context values to the components within the Routes
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <UsernameContext.Provider value={{ userName, setUserName }}>
        {/* Main container div */}
        <div className="App">
          {/* React Router Routes for different pages */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/CreateTask" element={<CreateTask />} />
            <Route exact path="/DeleteTask/:task" element={<DeleteTask />} />
            <Route exact path="/EditTask/:task" element={<EditTask />} />
          </Routes>
        </div>
      </UsernameContext.Provider>
    </LoginContext.Provider>
  );
}

// Export the App component as the default export
export default App;
