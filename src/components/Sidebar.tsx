import {
  Activity,
  BarChart3,
  Car,
  FileText,
  Gauge,
  LayoutDashboard,
  Map,
  Radio,
  Route,
  Settings,
  TriangleAlert,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Live Map",
    path: "/live-map",
    icon: Map,
    live: true,
  },
  {
    label: "Vehicles",
    path: "/vehicles",
    icon: Car,
  },
  {
    label: "Traffic",
    path: "/traffic",
    icon: Activity,
  },
  {
    label: "Incidents",
    path: "/incidents",
    icon: TriangleAlert,
  },
  {
    label: "Zones",
    path: "/zones",
    icon: Route,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Scenarios",
    path: "/scenarios",
    icon: Gauge,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* LOGO */}

      <div className="logo-area">
        <div className="logo-icon">
          <Radio size={28} strokeWidth={1.8} />
        </div>

        <div>
          <h2>METROPOLIS</h2>
          <span>AI DIGITAL TWIN</span>
        </div>
      </div>

      {/* SYSTEM STATUS */}

      <div className="sidebar-system-status">
        <div className="system-status-header">
          <span className="system-status-dot" />
          <span>SYSTEM OPERATIONAL</span>
        </div>

        <p>Simulation engine active</p>
      </div>

      {/* NAVIGATION */}

      <div className="sidebar-section-title">
        CITY OPERATIONS
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={17} strokeWidth={1.8} />

              <span>{item.label}</span>

              {item.live && (
                <span className="live-nav-indicator">
                  <span />
                  LIVE
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* BOTTOM */}

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-item settings-nav ${
              isActive ? "active" : ""
            }`
          }
        >
          <Settings size={17} strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>

        {/* ADMIN */}

        <div className="sidebar-admin">
          <div className="sidebar-admin-avatar">
            M
          </div>

          <div>
            <strong>Metropolis Admin</strong>
            <span>Control Center</span>
          </div>
        </div>
      </div>
    </aside>
  );
}