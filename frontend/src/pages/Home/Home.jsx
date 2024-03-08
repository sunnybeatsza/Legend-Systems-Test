import React, { useContext } from "react";
import { LoginContext } from "../../App";

import { Navbar } from "../../components/Navbar/Navbar";

export const Home = () => {
  // Access the isLoggedIn state from the LoginContext
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <div>
      {/* Navbar component */}
      <div>
        <Navbar />
      </div>
      {/* Conditional rendering based on user authentication status */}
      {isLoggedIn ? (
        // Display content for authenticated users
        <div>
          <h1>Welcome Back!</h1>
        </div>
      ) : (
        // Display content for non-authenticated users
        <div>
          <h1>Welcome to TaskMaster!</h1>
          <p>Please login or register to access your to-do list tasks.</p>
        </div>
      )}
    </div>
  );
};
