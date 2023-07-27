import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [phone_no, setphone_no] = useState("");
    const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    const url = "http://localhost:5000/user/signup";
    const body = {
      username,
      email,
      password: pass,
      phone_no
    };
    // const response = await axios.post(url, body);
    // // Handle signup functionality here, e.g., make an API call
    // // to create a new user account
    // console.log(response.data);

    try {
        const response = await axios.post(url, body);
        console.log(response.data);
  
        // If registration is successful, redirect to the login page
         navigate("/login");
      } catch (error) {
        // Handle registration error here
        if (error.response && error.response.data && error.response.data.message) {
          console.error("Registration failed:", error.response.data.message);
        } else {
          console.error("Registration failed:", error.message);
        }
      }
  };
  const handleRegisterButtonClick = () => {
    navigate("/login"); // Redirect to the "/register" page when the button is clicked
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="number"
          name="phone_no"
          placeholder="Phone Number"
          value={phone_no}
          onChange={(e) => setphone_no(e.target.value)}
        />
        <br />
        <button type="submit">REGISTER</button>
        <button onClick={handleRegisterButtonClick}>LOGIN</button>
      </form>
     
    </div>
  );
};

export default Signup;
