import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  const mockFetch = (url, options) => {
    return new Promise((resolve, reject) => {
      if (
        url === "http://localhost:5000/auth/login" &&
        options.method === "POST"
      ) {
        resolve({
          json: () =>
            Promise.resolve({
              message: "Login successful",
              success: true,
              jwtToken: "jwtToken",
              name: "name",
            }),
        });
      } else {
        reject(new Error("Not Found"));
      }
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = loginInfo;

    if (!username || !password) {
      return handleError("All fields are required");
    }
    if (password.length < 4) {
      return handleError("Password must be at least 4 characters long");
    }

    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok && result.success) {
        localStorage.setItem("jwtToken", result.jwtToken);
        localStorage.setItem("loggedInUser", result.username);
        handleSuccess(result.message);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        handleError(result.message || "Login failed");
      }
    } catch (err) {
      handleError(err.message || "Network error");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="name">Email</label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Enter your username"
            value={loginInfo.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
