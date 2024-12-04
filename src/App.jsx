import { useState } from "react";
import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
