// Import necessary libraries and components
import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { LoginContext, UsernameContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

// Define the Login component
const Login = () => {
  // Access the isLoggedIn state and setIsLoggedIn function from the LoginContext
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  // Access the setUserName function from the UsernameContext
  const { setUserName } = useContext(UsernameContext);

  // Access the navigate function from React Router
  const navigate = useNavigate();

  // Initialize useFormik hook to manage form state and validation
  const formik = useFormik({
    // Initial values for the form fields
    initialValues: {
      userName: "",
      passWord: "",
    },
    // Handle form submission
    onSubmit: async (values) => {
      try {
        // Make a POST request to the login endpoint
        const response = await axios.post(
          "http://localhost:8080/login",
          values
        );

        // Update the username in the context
        setUserName(values.username);

        // Handle the response accordingly
        if (response.status === 200) {
          console.log("Login successful:", response.data);
          alert("Login Successful");

          // Set the isLoggedIn state to true
          setIsLoggedIn(true);

          // Redirect to the dashboard
          navigate("/Dashboard");
        } else {
          console.log("Login failed:", response.data);
          alert("Login Failed");
          // Handle unsuccessful login (display error message, etc.)
        }
      } catch (error) {
        // Handle login errors
        console.error("Login failed:", error.message);
        alert("Login Failed");
      }
    },
  });

  // Render the Login component
  return (
    <div>
      {/* Navbar component */}
      <Navbar />

      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        // Display message for authenticated users
        <p>Login successful! Welcome back!</p>
      ) : (
        // Display login form for non-authenticated users
        <div>
          <h1>Login</h1>
          {/* Login form */}
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

            {/* Submit button for the form */}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

// Export the Login component
export default Login;
