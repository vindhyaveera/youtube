// LoginForm.js
import React, { useState } from "react";
import "./LoginComponents.css"; // Import the CSS file
import { useDispatch } from "react-redux";
import { setUserID } from "../../../features/videos/videoSlice";

const LoginForm = ({ onClose }) => {
  const dispatch = useDispatch();

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

  const handleSubmit = (event) => {
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
      loginUser(loginData);
      // Add login logic (e.g., API call)
    }
    // onClose(); // Close form after submission (optional)
  };

  async function loginUser(loginData) {
    setStatus("Please wait");
    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("id", data.token.id);
        localStorage.setItem("token", data.token.token);
        const ID = localStorage.getItem("id", data.token.id);
        dispatch(setUserID(ID)); // Store it in Redux
      }
      setStatus(data.message);
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Login Failed");
    }
  }

  async function createUser(formData) {
    // alert(".../")
    setStatus("Please wait");
    try {
      const response = await fetch("http://localhost:4000/users/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setStatus(data.message);
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Register Failed");
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
