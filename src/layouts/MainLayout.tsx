import {
  Activity,
  Bell,
  Menu,
  Search,
} from "lucide-react";
import {
  useState,
} from "react";
import {
  Outlet,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  return (
    <div className="metro-shell">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {mobileOpen && (
        <button
          className="metro-mobile-overlay"
          aria-label="Close navigation"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* =====================================================
          MAIN APPLICATION AREA
      ===================================================== */}

      <main className="metro-main">

        {/* ===================================================
            TOP COMMAND BAR
        =================================================== */}

        <header className="metro-topbar">

          <div className="metro-topbar-left">

            <button
              className="metro-mobile-menu"
              onClick={() =>
                setMobileOpen(true)
              }
              aria-label="Open navigation"
            >
              <Menu size={19} />
            </button>

            <div className="metro-command-mark">
              <Activity
                size={15}
                strokeWidth={2.5}
              />
            </div>

            <div className="metro-breadcrumb">

              <span>
                METROPOLIS
              </span>

              <strong>/</strong>

              <span className="metro-breadcrumb-current">
                CITY OPERATIONS
              </span>

            </div>

          </div>

          <div className="metro-topbar-right">

            <div className="metro-system-chip">

              <span className="metro-system-pulse" />

              <span>
                SIMULATION ENGINE
              </span>

              <strong>
                ONLINE
              </strong>

            </div>

            <button
              className="metro-topbar-icon"
              aria-label="Search"
            >
              <Search size={17} />
            </button>

            <button
              className="metro-topbar-icon metro-notification"
              aria-label="Notifications"
            >
              <Bell size={17} />

              <span className="metro-notification-dot" />
            </button>

            <div className="metro-user">

              <div className="metro-user-avatar">
                M
              </div>

              <div className="metro-user-info">

                <strong>
                  METROPOLIS ADMIN
                </strong>

                <span>
                  CONTROL CENTER
                </span>

              </div>

            </div>

          </div>

        </header>

        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <div className="metro-content">
          <Outlet />
        </div>

      </main>

    </div>
  );
}