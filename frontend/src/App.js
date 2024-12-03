import { useState } from "react";
import { Navigate } from "react-router";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RefreshHandler from "./pages/RefreshHandler";
import Signup from "./pages/Signup";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("jwtToken");
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}></RefreshHandler>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
