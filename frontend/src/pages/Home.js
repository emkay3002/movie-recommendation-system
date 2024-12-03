import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:5000/products";

      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        console.error("Token not found in localStorage");
        throw new Error("Authorization token not found");
      }
      //console.log("JWT Token:", jwtToken);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          console.error("JWT token is invalid or expired");
          throw new Error("Unauthorized, please log in again.");
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Products:", result);
      setProducts(result);
    } catch (err) {
      handleError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products &&
          products?.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name}:{item.genre}
              </span>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
