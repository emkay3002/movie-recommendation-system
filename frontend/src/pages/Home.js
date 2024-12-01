import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils";
function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    //window.location.href = "/login";
  };

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <>
        <ToastContainer />
      </>
    </div>
  );
}

export default Home;
