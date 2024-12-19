// LoginForm.js
import React, { useState, useEffect } from "react";
import "./LoginComponents.css"; // Import the CSS file
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setToken,
  setUserId,
  setuserName,
} from "../../../features/videos/videoSlice";
import { toggleLogin } from "../../../features/videos/videoSlice";

const LoginForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.videos.userId);
  const isLoggedIn = useSelector((store) => store.videos.isLoggedIn);

  // Update isLoggedIn state based on userid changes
  // useEffect(() => {
  //   if (userId === null) {
  //     dispatch(toggleLogin()); // Dispatch action to toggle login state when user is logged out
  //   } else {
  //     dispatch(toggleLogin()); // Dispatch action to toggle login state when user is logged out
  //   }
  // }, [userId, dispatch]); // The effect runs when userid changes

  // // Function to handle the start image click
  // const handleStartImageClick = () => {
  //   if (!isLoggedIn) {
  //     alert("You need to sign in to access this feature!");
  //   } else {
  //     // Perform your actual functionality for the start image here
  //     console.log("Start image clicked!");
  //   }
  // };

  const [isRegister, setIsRegister] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle login or registration logic here
    if (isRegister) {
      console.log("Registering user:", formData);
      createUser(formData);

      // Add registration logic (e.g., API call)
    } else {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      console.log("Logging in user:", {
        email: formData.email,
        password: formData.password,
      });
      await loginUser(loginData);
      // Add login logic (e.g., API call)
    }
    // onClose(); // Close form after submission (optional)
  };

  async function loginUser(loginData) {
    setStatus("Please wait");
    try {
      const response = await fetch(
        "https://youtube-sequelize-server.onrender.com/users/login",
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();
      console.log(data);

      // if (data.ok) {
      // localStorage.setItem("id", data.token.id);
      // localStorage.setItem("token", data.token.token);

      dispatch(setUserId(data.token.id));
      dispatch(setToken(data.token.token));
      dispatch(setuserName(data.firstName)); // Adjust this based on your API response

      // const ID = localStorage.getItem("id", data.token.id);
      // dispatch(setUserID(ID)); // Store it in Redux
      setStatus("Login Successful!");
      console.log("Closing form..."); // Debugging

      onClose();
      // alert("Loginvindhya");
      setTimeout(() => {
      onClose(); // Close the form after successful login
      }, 1000); // Optional delay for user feedback
    } catch (error) {
      // setStatus(data.message);
      console.log(error.message);
      console.log(error);
      // alert("Login Failed");`
      setStatus("Login Failed");
    }
  }

  async function createUser(formData) {
    // alert(".../")
    setStatus("Please wait");
    try {
      const response = await fetch(
        "https://youtube-sequelize-server.onrender.com/users/create",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      // if (response.ok) {
      setStatus("Registration Successful!");
      setTimeout(() => {
      onClose(); // Close the form after successful registration
      } , 1000); // Optional delay for user feedback
      // else {
      // setStatus(data.message || "Registration Failed");
      // }
    } catch (error) {
      console.log(error.message);
      console.log(error);
      setStatus("Registration Failed");
    }
  }

  return (
    <div className="form-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <h2>{status}</h2>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <button type="button" onClick={toggleForm}>
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
