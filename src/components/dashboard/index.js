import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
import Card from "./card";
import MapComp from "./mapcomp";
import RightPanel from "./rightpanel";
import Notification from "./notification";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Card />
      <div className="dashboard-content">
        <Sidebar />
        <MapComp />
        <RightPanel />
      </div>
      <Notification />
    </div>
  );
}
