import {
  Activity,
  BarChart3,
  CarFront,
  ChevronRight,
  CircleGauge,
  FileText,
  LayoutDashboard,
  Map,
  Radio,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  TrafficCone,
  X,
  Zap,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

type SidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

const primaryNavigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
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
    icon: CarFront,
  },
  {
    label: "Traffic",
    path: "/traffic",
    icon: TrafficCone,
  },
  {
    label: "Incidents",
    path: "/incidents",
    icon: ShieldAlert,
  },
  {
    label: "Zones",
    path: "/zones",
    icon: Radio,
  },
];

const intelligenceNavigation = [
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Scenarios",
    path: "/scenarios",
    icon: SlidersHorizontal,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

export default function Sidebar({
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={`metro-sidebar ${
        mobileOpen
          ? "metro-sidebar-open"
          : ""
      }`}
    >

      {/* ===================================================
          BRAND
      =================================================== */}

      <div className="metro-brand">

        <div className="metro-brand-symbol">
          <Activity
            size={25}
            strokeWidth={2.5}
          />

          <span />
        </div>

        <div className="metro-brand-copy">

          <strong>
            METROPOLIS
          </strong>

          <span>
            INTELLIGENT CITY TWIN
          </span>

        </div>

        <button
          className="metro-sidebar-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>

      </div>

      {/* ===================================================
          LIVE SYSTEM STATUS
      =================================================== */}

      <div className="metro-sidebar-status">

        <div className="metro-status-icon">
          <Zap
            size={13}
            fill="currentColor"
          />
        </div>

        <div className="metro-status-copy">

          <strong>
            SYSTEM OPERATIONAL
          </strong>

          <span>
            Simulation engine online
          </span>

        </div>

        <span className="metro-status-light" />

      </div>

      {/* ===================================================
          NAVIGATION
      =================================================== */}

      <div className="metro-sidebar-scroll">

        <div className="metro-nav-section">

          <div className="metro-nav-heading">
            COMMAND CENTER
          </div>

          <nav className="metro-nav">

            {primaryNavigation.map(
              ({
                label,
                path,
                icon: Icon,
                live,
              }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onClose}
                  end={
                    path ===
                    "/dashboard"
                  }
                  className={({ isActive }) =>
                    [
                      "metro-nav-item",
                      isActive
                        ? "active"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >

                  <span className="metro-nav-icon">
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="metro-nav-label">
                    {label}
                  </span>

                  {live && (
                    <span className="metro-live-label">

                      <span />

                      LIVE

                    </span>
                  )}

                  <ChevronRight
                    className="metro-nav-arrow"
                    size={14}
                  />

                </NavLink>
              ),
            )}

          </nav>

        </div>

        <div className="metro-nav-section">

          <div className="metro-nav-heading">
            INTELLIGENCE
          </div>

          <nav className="metro-nav">

            {intelligenceNavigation.map(
              ({
                label,
                path,
                icon: Icon,
              }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "metro-nav-item",
                      isActive
                        ? "active"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >

                  <span className="metro-nav-icon">
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="metro-nav-label">
                    {label}
                  </span>

                  <ChevronRight
                    className="metro-nav-arrow"
                    size={14}
                  />

                </NavLink>
              ),
            )}

          </nav>

        </div>

      </div>

      {/* ===================================================
          SIDEBAR BOTTOM
      =================================================== */}

      <div className="metro-sidebar-bottom">

        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            [
              "metro-nav-item",
              "metro-settings-link",
              isActive
                ? "active"
                : "",
            ]
              .filter(Boolean)
              .join(" ")
          }
        >

          <span className="metro-nav-icon">
            <Settings
              size={17}
              strokeWidth={1.8}
            />
          </span>

          <span className="metro-nav-label">
            Settings
          </span>

          <ChevronRight
            className="metro-nav-arrow"
            size={14}
          />

        </NavLink>

        <div className="metro-admin-card">

          <div className="metro-admin-avatar">
            M
          </div>

          <div className="metro-admin-info">

            <strong>
              METROPOLIS ADMIN
            </strong>

            <span>
              Control Center
            </span>

          </div>

          <CircleGauge
            size={15}
            className="metro-admin-indicator"
          />

        </div>

      </div>

    </aside>
  );
}