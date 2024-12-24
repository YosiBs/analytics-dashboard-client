import React from "react";
import { Link } from "react-router-dom";

const MyHome = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to MyHome</h1>
      <div>
        <Link to="/signup">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            SignUp
          </button>
        </Link>
        <Link to="/signin">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            SignIn
          </button>
        </Link>
        <Link to="/dashboard">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyHome;
