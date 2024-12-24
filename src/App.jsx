import { useState } from "react";
import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";
import SignIn from "./components/sign-in/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import MyHome from "./components/MyHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<MyHome />} />
      </Routes>
    </>
  );
}

export default App;
