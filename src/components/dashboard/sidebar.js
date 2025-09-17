import React from 'react';
import './sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/find-bins">Find Bins</a></li>
      <li><a href="/my-credits">My Credits</a></li>
      <li><a href="/rewards">Rewards</a></li>
    </ul>
  </aside>
);

export default Sidebar;
