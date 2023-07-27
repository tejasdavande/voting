import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/user/login";
    const body = {
      username,
      password: pass,
    };
    // const response = await axios.post(url, body);

    try {
      const response = await axios.post(url, body);
      let d = new Date();
      d.setTime(d.getTime() + 7 * 60 * 1000);
      // Store the token in a cookie with the name "token"
      cookies.set("access_token", response.data.accesstoken, {
        path: "/",
        expires: d,
      }); // Expires in 7 days
      console.log(response.data);
      if (response.data.userType === "admin") {
        navigate("/votingdata");
      } else {
        navigate("/votingpage");
      }
    } catch (error) {
      // Handle login error here
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert("Login failed: Invalid credentials");
        setUsername("");
        setPass("");
      } else {
        alert("Login failed: Invalid credentials");
        setUsername("");
        setPass("");
      }
    }
    // and store generated authentication token in cookie

    // console.log(response.data.accesstoken);
  };

  const handleRegisterButtonClick = () => {
    navigate("/register"); // Redirect to the "/register" page when the button is clicked
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <button type="submit">LOGIN</button>
        <button onClick={handleRegisterButtonClick}>REGISTER</button>
      </form>
      <br />
    </div>
  );
};

export default Login;
