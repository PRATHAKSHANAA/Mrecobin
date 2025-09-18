import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Leaf, Recycle, AlertTriangle, TrendingUp, Users, MapPin, Calendar, Bell, LogOut, BarChart3, Trash2, Route, AlertCircle, FileText } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Professional Environmental Theme Styles
const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#f8fffe",
    color: "#0f172a",
  },
  sidebar: {
    width: "280px",
    background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
    color: "#ffffff",
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "3rem",
    color: "#ffffff",
  },
  sidebarNav: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem 1.25rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "12px",
    marginBottom: "0.5rem",
    fontSize: "0.95rem",
    fontWeight: "500",
    position: "relative",
  },
  sidebarItemActive: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
  },
  dashboardMain: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    backgroundColor: "#f8fffe",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    padding: "1.5rem 2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    border: "1px solid rgba(6, 95, 70, 0.1)",
  },
  navTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#065f46",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#475569",
    fontSize: "0.95rem",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  metricCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    border: "1px solid rgba(6, 95, 70, 0.1)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  },
  metricCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  metricIcon: {
    padding: "0.75rem",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#065f46",
    lineHeight: "1",
    marginBottom: "0.5rem",
  },
  metricLabel: {
    fontSize: "0.95rem",
    color: "#64748b",
    fontWeight: "500",
  },
  metricTrend: {
    fontSize: "0.85rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    marginTop: "0.5rem",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
  },
  mapSection: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    border: "1px solid rgba(6, 95, 70, 0.1)",
  },
  sectionHeader: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#065f46",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  alertsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  alertsCard: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "20px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    border: "1px solid rgba(6, 95, 70, 0.1)",
  },
  alertItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderRadius: "12px",
    marginBottom: "1rem",
    transition: "all 0.3s ease",
    border: "1px solid #f1f5f9",
  },
  alertContent: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  alertIcon: {
    padding: "0.5rem",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    fontSize: "0.9rem",
    color: "#334155",
    fontWeight: "500",
  },
  alertBadge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#ffffff",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#059669",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "0.9rem",
    fontWeight: "500",
    width: "100%",
    justifyContent: "center",
    marginTop: "1rem",
  },
  mapStyle: {
    height: "450px",
    borderRadius: "16px",
    border: "2px solid rgba(6, 95, 70, 0.1)",
  },
  notificationBadge: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: "600",
  },
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data for different sections
  const [binsData] = useState([
    { id: "A247", location: "Marina Beach", fillLevel: 95, status: "Critical", lat: 13.0827, lng: 80.2707 },
    { id: "B156", location: "T. Nagar", fillLevel: 72, status: "Normal", lat: 13.0878, lng: 80.2785 },
    { id: "C089", location: "Adyar", fillLevel: 88, status: "High", lat: 13.0569, lng: 80.2462 },
    { id: "D234", location: "Velachery", fillLevel: 45, status: "Normal", lat: 12.9756, lng: 80.2207 },
    { id: "E178", location: "Anna Nagar", fillLevel: 91, status: "High", lat: 13.0850, lng: 80.2101 },
  ]);

  const [routesData] = useState([
    { id: "R001", name: "Central Chennai Route", bins: 15, status: "Active", efficiency: "92%" },
    { id: "R002", name: "South Chennai Route", bins: 12, status: "Delayed", efficiency: "78%" },
    { id: "R003", name: "North Chennai Route", bins: 18, status: "Active", efficiency: "89%" },
    { id: "R004", name: "West Chennai Route", bins: 14, status: "Maintenance", efficiency: "65%" },
  ]);

  const sidebarItems = [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Smart Bins", icon: Trash2 },
    { name: "Collection Routes", icon: Route },
    { name: "Critical Alerts", icon: AlertCircle },
    { name: "Environmental Reports", icon: FileText },
  ];

  const metrics = [
    {
      label: "Active Smart Bins",
      value: "1,247",
      trend: "+12% this month",
      positive: true,
      icon: Trash2,
      color: "#059669",
      bgColor: "rgba(5, 150, 105, 0.1)",
    },
    {
      label: "Average Fill Level",
      value: "68%",
      trend: "-5% vs last week",
      positive: true,
      icon: TrendingUp,
      color: "#0891b2",
      bgColor: "rgba(8, 145, 178, 0.1)",
    },
    {
      label: "Critical Alerts",
      value: "23",
      trend: "Requires immediate attention",
      positive: false,
      icon: AlertTriangle,
      color: "#dc2626",
      bgColor: "rgba(220, 38, 38, 0.1)",
    },
    {
      label: "CO₂ Saved",
      value: "2.4T",
      trend: "+18% this month",
      positive: true,
      icon: Leaf,
      color: "#16a34a",
      bgColor: "rgba(22, 163, 74, 0.1)",
    },
  ];

  const alerts = [
    { 
      text: "Bin #A247 at Marina Beach - 95% capacity", 
      level: "Critical", 
      color: "#dc2626",
      bgColor: "rgba(220, 38, 38, 0.1)",
      time: "2 min ago" 
    },
    { 
      text: "Collection route R3 experiencing delays", 
      level: "High", 
      color: "#ea580c",
      bgColor: "rgba(234, 88, 12, 0.1)",
      time: "15 min ago" 
    },
    { 
      text: "Sensor malfunction at bin #B156", 
      level: "Medium", 
      color: "#ca8a04",
      bgColor: "rgba(202, 138, 4, 0.1)",
      time: "1 hour ago" 
    },
  ];

  const handleLogout = () => {
    alert("Logging out... Redirecting to login page");
  };

  const handleSidebarClick = (item) => {
    setActiveTab(item);
    if (item === "Critical Alerts") {
      setNotifications(0);
    }
  };

  const handleActionClick = (action) => {
    alert(`${action} functionality activated`);
  };

  // Custom marker icons for different bin statuses
  const createCustomIcon = (status) => {
    const color = status === 'Critical' ? '#dc2626' : 
                 status === 'High' ? '#ea580c' : '#16a34a';
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      className: 'custom-marker'
    });
  };

  // Component definitions
  const Sidebar = () => (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <Recycle size={28} />
        EcoSmart Municipal
      </div>
      <ul style={styles.sidebarNav}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.name}
              style={{
                ...styles.sidebarItem,
                ...(activeTab === item.name ? styles.sidebarItemActive : {}),
              }}
              onClick={() => handleSidebarClick(item.name)}
            >
              <Icon size={20} />
              {item.name}
              {item.name === "Critical Alerts" && notifications > 0 && (
                <span style={styles.notificationBadge}>{notifications}</span>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );

  const Navbar = () => (
    <nav style={styles.navbar}>
      <div style={styles.navTitle}>
        <Leaf size={24} />
        Environmental Waste Management System
      </div>
      <div style={styles.navRight}>
        <div style={styles.userInfo}>
          <Calendar size={16} />
          {currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString()}
        </div>
        <div style={styles.userInfo}>
          <Users size={16} />
          Admin Portal
        </div>
        <button 
          style={styles.navButton}
          onClick={handleLogout}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#b91c1c"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#dc2626"}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );

  const MetricsGrid = () => (
    <div style={styles.metricsGrid}>
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div 
            key={index} 
            style={styles.metricCard}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-4px)";
              e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.06)";
            }}
          >
            <div style={styles.metricCardHeader}>
              <div>
                <div style={styles.metricValue}>{metric.value}</div>
                <div style={styles.metricLabel}>{metric.label}</div>
                <div style={{
                  ...styles.metricTrend,
                  color: metric.positive ? "#16a34a" : "#dc2626"
                }}>
                  <TrendingUp size={14} />
                  {metric.trend}
                </div>
              </div>
              <div style={{
                ...styles.metricIcon,
                backgroundColor: metric.bgColor,
                color: metric.color,
              }}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const MapComponent = () => (
    <div style={styles.mapSection}>
      <div style={styles.sectionHeader}>
        <MapPin size={20} />
        Real-time Bin Monitoring
      </div>
      <MapContainer 
        center={[13.0827, 80.2707]} 
        zoom={11} 
        style={styles.mapStyle}
        key="main-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {binsData.map((bin) => (
          <Marker 
            key={bin.id}
            position={[bin.lat, bin.lng]}
            icon={createCustomIcon(bin.status)}
          >
            <Popup>
              <div style={{ textAlign: 'center', padding: '5px' }}>
                <strong>{bin.location}</strong><br/>
                Bin ID: {bin.id}<br/>
                Fill Level: {bin.fillLevel}%<br/>
                Status: <span style={{ 
                  color: bin.status === 'Critical' ? '#dc2626' : 
                         bin.status === 'High' ? '#ea580c' : '#16a34a',
                  fontWeight: 'bold'
                }}>{bin.status}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );

  const AlertsPanel = () => (
    <div style={styles.alertsSection}>
      <div style={styles.alertsCard}>
        <div style={styles.sectionHeader}>
          <Bell size={20} />
          Priority Alerts
        </div>
        {alerts.map((alert, index) => (
          <div key={index} style={{
            ...styles.alertItem,
            backgroundColor: alert.bgColor,
          }}>
            <div style={styles.alertContent}>
              <div style={{
                ...styles.alertIcon,
                backgroundColor: alert.color,
                color: "#ffffff",
              }}>
                <AlertTriangle size={16} />
              </div>
              <div>
                <div style={styles.alertText}>{alert.text}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.25rem" }}>
                  {alert.time}
                </div>
              </div>
            </div>
            <span style={{
              ...styles.alertBadge,
              backgroundColor: alert.color,
            }}>
              {alert.level}
            </span>
          </div>
        ))}
        <button 
          style={styles.actionButton}
          onClick={() => handleActionClick("View All Alerts")}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#047857"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#059669"}
        >
          <AlertCircle size={16} />
          View All Alerts
        </button>
      </div>

      <div style={styles.alertsCard}>
        <div style={styles.sectionHeader}>
          <Leaf size={20} />
          Environmental Impact
        </div>
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <div style={{ fontSize: "2rem", fontWeight: "700", color: "#16a34a", marginBottom: "0.5rem" }}>
            2,847 kg
          </div>
          <div style={{ color: "#64748b", marginBottom: "1rem" }}>
            Waste Diverted from Landfills Today
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: "600", color: "#059669", marginBottom: "1rem" }}>
            15% Recycling Rate Improvement
          </div>
        </div>
        <button 
          style={styles.actionButton}
          onClick={() => handleActionClick("Generate Environmental Report")}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#047857"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#059669"}
        >
          <FileText size={16} />
          Generate Report
        </button>
      </div>
    </div>
  );

  const BinsManagement = ({ binsData }) => (
    <div style={styles.alertsCard}>
      <div style={styles.sectionHeader}>
        <Trash2 size={20} />
        Smart Bins Management
      </div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {binsData.map((bin) => (
          <div key={bin.id} style={{
            ...styles.alertItem,
            backgroundColor: bin.status === 'Critical' ? 'rgba(220, 38, 38, 0.1)' :
                           bin.status === 'High' ? 'rgba(234, 88, 12, 0.1)' : 'rgba(22, 163, 74, 0.1)'
          }}>
            <div style={styles.alertContent}>
              <div style={{
                ...styles.alertIcon,
                backgroundColor: bin.status === 'Critical' ? '#dc2626' :
                               bin.status === 'High' ? '#ea580c' : '#16a34a',
                color: '#ffffff'
              }}>
                <Trash2 size={16} />
              </div>
              <div>
                <div style={styles.alertText}>
                  Bin {bin.id} - {bin.location}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Fill Level: {bin.fillLevel}%
                </div>
              </div>
            </div>
            <span style={{
              ...styles.alertBadge,
              backgroundColor: bin.status === 'Critical' ? '#dc2626' :
                             bin.status === 'High' ? '#ea580c' : '#16a34a'
            }}>
              {bin.status}
            </span>
          </div>
        ))}
      </div>
      <button 
        style={styles.actionButton}
        onClick={() => handleActionClick("Add New Bin")}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#047857"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#059669"}
      >
        <Trash2 size={16} />
        Add New Smart Bin
      </button>
    </div>
  );

  const RoutesManagement = ({ routesData }) => (
    <div style={styles.alertsCard}>
      <div style={styles.sectionHeader}>
        <Route size={20} />
        Collection Routes Management
      </div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {routesData.map((route) => (
          <div key={route.id} style={{
            ...styles.alertItem,
            backgroundColor: route.status === 'Delayed' ? 'rgba(234, 88, 12, 0.1)' :
                           route.status === 'Maintenance' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 163, 74, 0.1)'
          }}>
            <div style={styles.alertContent}>
              <div style={{
                ...styles.alertIcon,
                backgroundColor: route.status === 'Delayed' ? '#ea580c' :
                               route.status === 'Maintenance' ? '#dc2626' : '#16a34a',
                color: '#ffffff'
              }}>
                <Route size={16} />
              </div>
              <div>
                <div style={styles.alertText}>
                  {route.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {route.bins} bins • Efficiency: {route.efficiency}
                </div>
              </div>
            </div>
            <span style={{
              ...styles.alertBadge,
              backgroundColor: route.status === 'Delayed' ? '#ea580c' :
                             route.status === 'Maintenance' ? '#dc2626' : '#16a34a'
            }}>
              {route.status}
            </span>
          </div>
        ))}
      </div>
      <button 
        style={styles.actionButton}
        onClick={() => handleActionClick("Optimize Routes")}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#047857"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#059669"}
      >
        <Route size={16} />
        Optimize All Routes
      </button>
    </div>
  );

  const AlertsManagement = ({ alerts }) => (
    <div style={styles.alertsCard}>
      <div style={styles.sectionHeader}>
        <AlertCircle size={20} />
        Critical Alerts Management
      </div>
      {alerts.map((alert, index) => (
        <div key={index} style={{
          ...styles.alertItem,
          backgroundColor: alert.bgColor,
        }}>
          <div style={styles.alertContent}>
            <div style={{
              ...styles.alertIcon,
              backgroundColor: alert.color,
              color: "#ffffff",
            }}>
              <AlertTriangle size={16} />
            </div>
            <div>
              <div style={styles.alertText}>{alert.text}</div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "0.25rem" }}>
                {alert.time}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{
              ...styles.alertBadge,
              backgroundColor: alert.color,
            }}>
              {alert.level}
            </span>
            <button 
              style={{
                padding: '0.25rem 0.75rem',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: '#059669',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
              onClick={() => handleActionClick(`Resolve Alert ${index + 1}`)}
            >
              Resolve
            </button>
          </div>
        </div>
      ))}
      <button 
        style={styles.actionButton}
        onClick={() => handleActionClick("Clear All Alerts")}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#047857"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#059669"}
      >
        <AlertCircle size={16} />
        Clear All Resolved
      </button>
    </div>
  );

  const ReportsSection = () => (
    <div style={styles.alertsCard}>
      <div style={styles.sectionHeader}>
        <FileText size={20} />
        Environmental Impact Reports
      </div>
      <div style={{ display: 'grid', gap: '1.5rem', padding: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#16a34a', marginBottom: '0.5rem' }}>
            12,847 kg
          </div>
          <div style={{ color: '#64748b', marginBottom: '2rem' }}>
            Total Waste Processed This Month
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(22, 163, 74, 0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#16a34a' }}>2,847 kg</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Recycled</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(8, 145, 178, 0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0891b2' }}>4.2 T CO₂</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Saved</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            style={styles.actionButton}
            onClick={() => handleActionClick("Generate Monthly Report")}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#047857"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#059669"}
          >
            <FileText size={16} />
            Generate Monthly Report
          </button>
          <button 
            style={styles.actionButton}
            onClick={() => handleActionClick("Export Data")}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#047857"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#059669"}
          >
            <TrendingUp size={16} />
            Export Performance Data
          </button>
        </div>
      </div>
    </div>
  );

  // Main content renderer
  const renderMainContent = () => {
    switch(activeTab) {
      case "Smart Bins":
        return <BinsManagement binsData={binsData} />;
      case "Collection Routes":
        return <RoutesManagement routesData={routesData} />;
      case "Critical Alerts":
        return <AlertsManagement alerts={alerts} />;
      case "Environmental Reports":
        return <ReportsSection />;
      default:
        return (
          <>
            <MetricsGrid />
            <div style={styles.contentGrid}>
              <MapComponent />
              <AlertsPanel />
            </div>
          </>
        );
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <Sidebar />
      <div style={styles.dashboardMain}>
        <Navbar />
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Dashboard;