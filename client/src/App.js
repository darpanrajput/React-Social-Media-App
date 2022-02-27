import Home from "./pages/home/Home";
import Profile from "./pages/home/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";
import { Messenger } from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route exact path="/profile/:username" element={<Profile />} />

        <Route
          exact
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
      </Routes>
    </Router>
  );
}

export default App;
