// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [role, setRole] = useState("citizen");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (role === "citizen") navigate("/dashboard");
//     else navigate("/municipal-dashboard");
//   };

//   return (
//     <div className="page">
//       <h1>Signup</h1>
//       <div className="tabs">
//         <button className={role === "citizen" ? "active" : ""} onClick={() => setRole("citizen")}>Citizen</button>
//         <button className={role === "municipal" ? "active" : ""} onClick={() => setRole("municipal")}>Municipal</button>
//       </div>
//       <form className="form" onSubmit={handleSubmit}>
//         <input type="text" placeholder={role === "citizen" ? "Citizen Name" : "Municipal Office Name"} />
//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Signup = () => {
  const [role, setRole] = useState("citizen");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ You can replace this with backend API call (POST to Flask/MongoDB)
    console.log("Signup Data:", { role, ...form });

    // Navigate based on role
    if (role === "citizen") navigate("/dashboard");
    else navigate("/municipal-dashboard");
  };

  return (
    <div className="page">
      <h1>Signup</h1>

      {/* Role Tabs */}
      <div className="tabs">
        <button
          className={role === "citizen" ? "active" : ""}
          onClick={() => setRole("citizen")}
        >
          Citizen
        </button>
        <button
          className={role === "municipal" ? "active" : ""}
          onClick={() => setRole("municipal")}
        >
          Municipal
        </button>
      </div>

      {/* Signup Form */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={role === "citizen" ? "Citizen Name" : "Municipal Office Name"}
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
