import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("citizen");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "citizen") navigate("/dashboard");
    else navigate("/municipal-dashboard");
  };

  return (
    <div className="page">
      <h1>Signup</h1>
      <div className="tabs">
        <button className={role === "citizen" ? "active" : ""} onClick={() => setRole("citizen")}>Citizen</button>
        <button className={role === "municipal" ? "active" : ""} onClick={() => setRole("municipal")}>Municipal</button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder={role === "citizen" ? "Citizen Name" : "Municipal Office Name"} />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
