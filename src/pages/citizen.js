import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { 
  Leaf, 
  Recycle, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MapPin, 
  Gift,
  Calendar, 
  Bell, 
  LogOut, 
  BarChart3, 
  Trash2, 
  Route, 
  AlertCircle, 
  FileText 
} from "lucide-react";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});


const styles = {
  container: { display: "flex", minHeight: "100vh", background: "#f8fffe" },
  sidebar: {
    width: "200px",
    background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
  },
  sidebarItem: {
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "0.5rem",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s",
  },
  sidebarItemActive: { background: "rgba(255,255,255,0.15)" },
  main: { flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // fixed 4 equal cards
    gap: "1rem",
  },
  card: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "1rem",
    gap: "0.5rem",
  },
  contentGrid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" },
  mapBox: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "14px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  mapStyle: { height: "400px", borderRadius: "10px" },
  rightPanel: { display: "flex", flexDirection: "column", gap: "1rem" },
  panel: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "14px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  recentItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.75rem",
    background: "#f9fafb",
    marginBottom: "0.5rem",
    borderRadius: "8px",
    fontSize: "0.9rem",
  },
  rewardButton: {
    background: "#047857",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginTop: "0.5rem",
    width: "100%",
  },
  
};

const CitizenPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [binsData] = useState([
    { id: "C1", location: "Marina Beach", fillLevel: 80, status: "Full", lat: 13.0827, lng: 80.2707 },
    { id: "C2", location: "Adyar", fillLevel: 40, status: "Medium", lat: 13.0569, lng: 80.2462 },
  ]);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const handleSignOut = () => {
 
    // ✅ Clear any stored data if needed (future backend integration)
    // localStorage.removeItem("user");
  
    // ✅ Redirect to login page
    navigate("/login");
  };

  const createCustomIcon = (status) => {
    const color = status === "Full" ? "#dc2626" : status === "Medium" ? "#facc15" : "#16a34a";
    return L.divIcon({
      html: `<div style="background-color:${color};width:20px;height:20px;border-radius:50%;border:2px solid white;"></div>`,
      iconSize: [20, 20],
    });
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
  <div style={styles.sidebarItem}><BarChart3 size={18}/> Dashboard</div>
  <div style={styles.sidebarItem}><MapPin size={18}/> Find Bins</div>
  <div style={styles.sidebarItem}><Leaf size={18}/> My Credits</div>
  <div style={styles.sidebarItem}><Gift size={18}/> Rewards</div>
</aside>


      {/* Main Content */}
      <div style={styles.main}>
        {/* Navbar */}
        <div style={styles.navbar}>
          <h2>Smarten Citizens – Welcome Back</h2>
          <div>
            <span style={{ marginRight: "1rem" }}>
              <Calendar size={16} /> {currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString()}
            </span>
            <button
            onClick={handleSignOut}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
          </div>
        </div>

        {/* Cards */}
        <div style={styles.cards}>
  <div style={styles.card}>
    <Recycle color="#059669" size={24} />
    <strong>Eco Credits</strong>
  </div>
  <div style={styles.card}>
    <TrendingUp color="#0891b2" size={24} />
    <strong>Daily Usage</strong>
  </div>
  <div style={styles.card}>
    <BarChart3 color="#facc15" size={24} />
    <strong>Weekly Usage</strong>
  </div>
  <div style={styles.card}>
    <Calendar color="#dc2626" size={24} />
    <strong>Monthly Usage</strong>
  </div>
</div>


        {/* Content Section */}
        <div style={styles.contentGrid}>
          {/* Map */}
          <div style={styles.mapBox}>
            <h3><MapPin size={16}/> Nearby Smart Bins</h3>
            <MapContainer center={[13.0827, 80.2707]} zoom={12} style={styles.mapStyle}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {binsData.map((bin) => (
                <Marker key={bin.id} position={[bin.lat, bin.lng]} icon={createCustomIcon(bin.status)}>
                  <Popup>
                    <b>{bin.location}</b> <br /> Fill: {bin.fillLevel}% <br /> Status: {bin.status}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Right Panel */}
          <div style={styles.rightPanel}>
            {/* Notifications */}
            <div style={styles.panel}>
              <h3><Bell size={16}/> Notifications</h3>
              <div style={styles.recentItem}><span><AlertCircle size={18}/> Garbage truck delayed by 30 mins</span></div>
              <div style={styles.recentItem}><span><Gift size={18}/> New reward scheme available!</span></div>
              <div style={styles.recentItem}><span><Calendar size={18}/> Community cleanup drive this Sunday</span></div>
            </div>

            {/* Recent Activity */}
            <div style={styles.panel}>
              <h3>Recent Activity</h3>
              <div style={styles.recentItem}><span><Recycle size={18}/> Recycled Plastic</span><span>+5 credits</span></div>
              <div style={styles.recentItem}><span><Leaf size={18}/> Compost Used</span><span>+3 credits</span></div>
            </div>

            {/* Rewards */}
            <div style={styles.panel}>
              <h3>Total Rewards</h3>
              <p> <Gift size={18}/> 1200 Points</p>
              <button style={styles.rewardButton}>Redeem Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPage;
