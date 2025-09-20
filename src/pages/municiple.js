import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { 
  BarChart3, 
  Recycle, 
  Route, 
  AlertTriangle, 
  FileText, 
  LogOut, 
  Bell,
  TrendingUp,
  Users,
  Truck,
  Leaf,
  Award,
  Calendar,
  Activity
} from "lucide-react";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#f8fafc",
  },
  sidebar: {
    width: "280px",
    background: "linear-gradient(135deg, #047857 0%, #059669 100%)",
    color: "#fff",
    padding: "2rem 1.5rem",
    flexShrink: 0,
    position: "fixed",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
  },
  sidebarHeader: {
    fontSize: "1.75rem",
    fontWeight: "800",
    marginBottom: "2.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.875rem 1.25rem",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "0.5rem",
    transition: "all 0.2s ease",
    fontWeight: "500",
  },
  sidebarItemActive: {
    backgroundColor: "rgba(255,255,255,0.25)",
    transform: "translateX(4px)",
  },
  mainContent: {
    marginLeft: "280px",
    padding: "2.5rem",
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    backgroundColor: "#ffffff",
    padding: "1.5rem 2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "2.5rem",
  },
  statCard: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  statCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  },
  mapContainer: {
    height: "600px",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  easterEggModal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffff",
    padding: "3rem",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    zIndex: 1000,
    textAlign: "center",
    maxWidth: "500px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 999,
  },
  konamiIndicator: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#047857",
    color: "white",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    opacity: 0.7,
  },
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [notifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggType, setEasterEggType] = useState("");
  const [konamiSequence, setKonamiSequence] = useState([]);
  const [showKonamiIndicator, setShowKonamiIndicator] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Konami Code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Konami code listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      const newSequence = [...konamiSequence, event.code].slice(-10);
      setKonamiSequence(newSequence);
      
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        triggerEasterEgg("konami");
        setKonamiSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiSequence]);

  // Show Konami indicator when partially entered
  useEffect(() => {
    const partialMatch = konamiCode.slice(0, konamiSequence.length).every((key, index) => key === konamiSequence[index]);
    setShowKonamiIndicator(partialMatch && konamiSequence.length > 3);
  }, [konamiSequence]);

  // Enhanced bin data with more realistic details
  const DustbinIcon = new L.Icon({
    iconUrl: "/greenbin.png", // remove default styles
    iconSize: [60, 60],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
  
  const binsData = [
    { 
      id: "A247", 
      location: "outer ring road", 
      fillLevel: 95, 
      status: "Critical", 
      lat: 13.086696450824595, 
      lng: 80.23396748061305,
      lastCollection: "2 days ago",
      type: "Mixed Waste"
    },
    { 
      id: "B156", 
      location: "Mandapam Road", 
      fillLevel: 72, 
      status: "Normal", 
      lat:13.085078102330876, lng:80.23040816062182,
      lastCollection: "1 day ago",
      type: "Recyclables"
    },
    { 
      id: "C089", 
      location: "Raji Street", 
      fillLevel: 60, 
      status: "Normal", 
      lat:13.090782287550095, lng:80.23173070794498,
      lastCollection: "6 hours ago",
      type: "Organic Waste"
    },
    { 
      id: "D123", 
      location: "Palli Arasan Street", 
      fillLevel: 88, 
      status: "High", 
      lat:13.087794089939603, lng:80.23123969445336,
      lastCollection: "3 days ago",
      type: "Mixed Waste"
    },
  ];

  const stats = [
    {
      title: "Total Collections Today",
      value: "247",
      change: "+12%",
      icon: Truck,
      color: "#047857"
    },
    {
      title: "Waste Recycled",
      value: "1.2T",
      change: "+8%",
      icon: Recycle,
      color: "#0ea5e9"
    },
    {
      title: "Active Smart Bins",
      value: "156",
      change: "+3%",
      icon: Activity,
      color: "#8b5cf6"
    },
    {
      title: "Carbon Saved",
      value: "342kg",
      change: "+15%",
      icon: Leaf,
      color: "#10b981"
    }
  ];

  const sidebarItems = [
    { label: "Dashboard", icon: BarChart3 },
    { label: "Smart Bins", icon: Recycle },
    { label: "Collection Routes", icon: Route },
    { label: "Critical Alerts", icon: AlertTriangle },
    { label: "Environmental Reports", icon: FileText },
    { label: "Team Performance", icon: Users },
    { label: "Analytics", icon: TrendingUp },
  ];

  const triggerEasterEgg = (type) => {
    setEasterEggType(type);
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 4000);
  };

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount === 6) { // 7 clicks total
      triggerEasterEgg("logo");
      setClickCount(0);
    }
  };

  const getEasterEggContent = () => {
    switch (easterEggType) {
      case "logo":
        return {
          title: "🎉 Developer Mode Activated!",
          message: "Congratulations! You've discovered the secret developer portal. Fun fact: This dashboard processes over 50,000 waste collection events daily!",
          emoji: "🚛♻️"
        };
      case "konami":
        return {
          title: "🏆 Konami Code Master!",
          message: "Incredible! You've unlocked the ultimate waste management achievement. You're now officially a GreenWaste ninja! 🥷",
          emoji: "⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️"
        };
      case "midnight":
        return {
          title: "🌙 Night Owl Detective!",
          message: "Working late? The night shift waste collectors salute you! Did you know 30% of our collections happen during night hours?",
          emoji: "🌃🦉"
        };
      default:
        return {
          title: "🎊 Easter Egg Found!",
          message: "You've discovered a hidden feature! Keep exploring for more surprises.",
          emoji: "🥚✨"
        };
    }
  };

  // Check for midnight Easter egg
  useEffect(() => {
    if (currentTime.getHours() === 0 && currentTime.getMinutes() === 0 && currentTime.getSeconds() < 2) {
      triggerEasterEgg("midnight");
    }
  }, [currentTime]);

  const renderContent = () => {
    if (activeTab === "Dashboard" || activeTab === "Smart Bins") {
      return (
        <div>
          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  ...styles.statCard,
                  ...(hoveredCard === index ? styles.statCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "600", margin: 0 }}>{stat.title}</h3>
                    <p style={{ color: "#1e293b", fontSize: "2rem", fontWeight: "800", margin: "0.5rem 0" }}>{stat.value}</p>
                    <span style={{ color: "#10b981", fontSize: "0.875rem", fontWeight: "600" }}>{stat.change} from last week</span>
                  </div>
                  <div style={{ 
                    backgroundColor: `${stat.color}15`, 
                    padding: "0.75rem", 
                    borderRadius: "12px",
                    color: stat.color 
                  }}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.5rem", fontWeight: "700" }}>Smart Bins Real-Time Map</h2>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#ef4444", borderRadius: "50%" }}></div>
                  <span style={{ fontSize: "0.875rem", color: "#64748b" }}>Critical (95%+)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                  <span style={{ fontSize: "0.875rem", color: "#64748b" }}>High (80-94%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "12px", height: "12px", backgroundColor: "#10b981", borderRadius: "50%" }}></div>
                  <span style={{ fontSize: "0.875rem", color: "#64748b" }}>Normal (0-79%)</span>
                </div>
              </div>
            </div>
            <div style={styles.mapContainer}>
            <MapContainer
  center={[13.0827, 80.2707]}
  zoom={12}
  scrollWheelZoom={true}
  style={{ height: "100%", width: "100%" }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
  {binsData.map((bin) => (
    <Marker key={bin.id} position={[bin.lat, bin.lng]} icon={DustbinIcon}>
      <Popup>
        <div style={{ minWidth: "200px" }}>
          <h4 style={{ margin: "0 0 8px 0", color: "#1e293b" }}>{bin.location}</h4>
          <p style={{ margin: "4px 0", fontSize: "14px" }}><strong>Bin ID:</strong> {bin.id}</p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}><strong>Fill Level:</strong> {bin.fillLevel}%</p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}><strong>Status:</strong> 
            <span style={{ 
              color: bin.status === "Critical" ? "#ef4444" : bin.status === "High" ? "#f59e0b" : "#10b981",
              fontWeight: "600",
              marginLeft: "4px"
            }}>
              {bin.status}
            </span>
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}><strong>Type:</strong> {bin.type}</p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}><strong>Last Collection:</strong> {bin.lastCollection}</p>
        </div>
      </Popup>
    </Marker>
  ))}
</MapContainer>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ 
        backgroundColor: "#ffffff", 
        padding: "4rem", 
        borderRadius: "16px", 
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        textAlign: "center" 
      }}>
        <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>{activeTab}</h2>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          {activeTab} functionality coming soon! This section will provide comprehensive insights and controls.
        </p>
        <div style={{ marginTop: "2rem", color: "#64748b" }}>
          🚧 Under Development 🚧
        </div>
      </div>
    );
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <>
          <div style={styles.overlay} onClick={() => setShowEasterEgg(false)} />
          <div style={styles.easterEggModal}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{getEasterEggContent().emoji}</div>
            <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>{getEasterEggContent().title}</h2>
            <p style={{ color: "#64748b", lineHeight: "1.6" }}>{getEasterEggContent().message}</p>
            <button 
              onClick={() => setShowEasterEgg(false)}
              style={{
                marginTop: "2rem",
                padding: "0.75rem 2rem",
                backgroundColor: "#047857",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Awesome! 🎉
            </button>
          </div>
        </>
      )}

      {/* Konami Code Indicator */}
      {showKonamiIndicator && (
        <div style={styles.konamiIndicator}>
          Konami progress: {konamiSequence.length}/10 ⬆️⬇️⬅️➡️
        </div>
      )}

      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader} onClick={handleLogoClick}>
          <Leaf size={28} /> GreenWaste Pro
        </div>
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            style={{
              ...styles.sidebarItem,
              ...(activeTab === item.label ? styles.sidebarItemActive : {}),
            }}
            onClick={() => setActiveTab(item.label)}
          >
            <item.icon size={20} /> {item.label}
          </div>
        ))}
        
        {/* Pro badge at bottom */}
        <div style={{ 
          marginTop: "auto", 
          padding: "1rem", 
          backgroundColor: "rgba(255,255,255,0.1)", 
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "0.875rem"
        }}>
          <Award size={16} style={{ marginBottom: "0.5rem" }} />
          <div>Professional Edition</div>
          <div style={{ opacity: 0.8, fontSize: "0.75rem" }}>v2.1.3</div>
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.mainContent}>
        <div style={styles.navbar}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h1 style={{ margin: 0, color: "#1e293b", fontSize: "1.5rem", fontWeight: "700" }}>
              {activeTab} Overview
            </h1>
            <div style={{ 
              backgroundColor: "#10b98115", 
              color: "#10b981", 
              padding: "0.25rem 0.75rem", 
              borderRadius: "20px", 
              fontSize: "0.875rem",
              fontWeight: "600"
            }}>
              Live
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Calendar size={16} color="#64748b" />
              <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                {currentTime.toLocaleDateString()}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", position: "relative" }}>
              <Bell size={18} color="#64748b" />
              <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                {notifications} alerts
              </span>
              {notifications > 0 && (
                <div style={{
                  position: "absolute",
                  top: "-4px",
                  right: "45px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%"
                }} />
              )}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "600" }}>
              {currentTime.toLocaleTimeString()}
            </div>
            <LogOut size={18} style={{ cursor: "pointer", color: "#64748b" }} />
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;