import {
  Bell,
  Check,
  Database,
  Globe,
  Lock,
  Monitor,
  Palette,
  RefreshCw,
  Save,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  User,
  Wifi,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [simulation, setSimulation] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="metropolis-page">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>

          <p className="page-subtitle">
            Configure METROPOLIS simulation, interface and system preferences
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          SYSTEM OPERATIONAL
        </div>
      </div>

      {/* =====================================================
          SYSTEM OVERVIEW
      ====================================================== */}

      <div className="grid-4">
        <div className="panel kpi-card">
          <Server size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            System Status
          </div>

          <div
            className="kpi-value"
            style={{ fontSize: 22 }}
          >
            Online
          </div>

          <div className="kpi-change">
            All services operational
          </div>
        </div>

        <div className="panel kpi-card">
          <Database size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Database
          </div>

          <div
            className="kpi-value"
            style={{ fontSize: 22 }}
          >
            MySQL
          </div>

          <div className="kpi-change">
            Connected
          </div>
        </div>

        <div className="panel kpi-card">
          <Wifi size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            API Server
          </div>

          <div
            className="kpi-value"
            style={{ fontSize: 22 }}
          >
            Port 5000
          </div>

          <div className="kpi-change">
            Backend connected
          </div>
        </div>

        <div className="panel kpi-card">
          <Monitor size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Frontend
          </div>

          <div
            className="kpi-value"
            style={{ fontSize: 22 }}
          >
            Port 5174
          </div>

          <div className="kpi-change">
            Vite development server
          </div>
        </div>
      </div>

      {/* =====================================================
          SETTINGS GRID
      ====================================================== */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* ===================================================
            GENERAL SETTINGS
        ==================================================== */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                General Settings
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Configure the main METROPOLIS environment
              </p>
            </div>

            <SlidersHorizontal size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <SettingRow
              icon={<User size={17} />}
              title="Operator Profile"
              description="Current system operator"
              right={
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Administrator
                </span>
              }
            />

            <SettingRow
              icon={<Globe size={17} />}
              title="Simulation Region"
              description="Active digital twin environment"
              right={
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Bengaluru
                </span>
              }
            />

            <SettingRow
              icon={<Palette size={17} />}
              title="Interface Theme"
              description="METROPOLIS visual interface"
              right={
                <Toggle
                  checked={darkMode}
                  onChange={setDarkMode}
                />
              }
            />

            <SettingRow
              icon={<RefreshCw size={17} />}
              title="Automatic Refresh"
              description="Refresh simulated data automatically"
              right={
                <Toggle
                  checked={autoRefresh}
                  onChange={setAutoRefresh}
                />
              }
            />
          </div>
        </section>

        {/* ===================================================
            NOTIFICATIONS
        ==================================================== */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Notifications
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Control system and simulation alerts
              </p>
            </div>

            <Bell size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <SettingRow
              icon={<Bell size={17} />}
              title="System Notifications"
              description="Receive important system alerts"
              right={
                <Toggle
                  checked={notifications}
                  onChange={setNotifications}
                />
              }
            />

            <SettingRow
              icon={<ShieldCheck size={17} />}
              title="Incident Alerts"
              description="Notify when new incidents are detected"
              right={
                <Toggle
                  checked={notifications}
                  onChange={setNotifications}
                />
              }
            />

            <SettingRow
              icon={<Database size={17} />}
              title="Database Alerts"
              description="Notify about database connectivity"
              right={
                <Toggle
                  checked={notifications}
                  onChange={setNotifications}
                />
              }
            />

            <SettingRow
              icon={<Wifi size={17} />}
              title="Connection Status"
              description="Monitor backend connectivity"
              right={
                <Toggle
                  checked={notifications}
                  onChange={setNotifications}
                />
              }
            />
          </div>
        </section>

        {/* ===================================================
            SIMULATION SETTINGS
        ==================================================== */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Simulation Engine
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Configure digital twin simulation behaviour
              </p>
            </div>

            <RefreshCw size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <SettingRow
              icon={<RefreshCw size={17} />}
              title="Vehicle Simulation"
              description="Continuously update simulated vehicles"
              right={
                <Toggle
                  checked={simulation}
                  onChange={setSimulation}
                />
              }
            />

            <SettingRow
              icon={<SlidersHorizontal size={17} />}
              title="Simulation Speed"
              description="Movement and environment update interval"
              right={
                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border:
                      "1px solid rgba(80,170,205,.14)",
                    background: "rgba(20,190,235,.04)",
                    fontSize: 11,
                  }}
                >
                  1x Normal
                </span>
              }
            />

            <SettingRow
              icon={<Monitor size={17} />}
              title="Map Animation"
              description="Display animated digital twin objects"
              right={
                <Toggle
                  checked={simulation}
                  onChange={setSimulation}
                />
              }
            />

            <SettingRow
              icon={<Globe size={17} />}
              title="Environment"
              description="Current simulation environment"
              right={
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Digital Twin
                </span>
              }
            />
          </div>
        </section>

        {/* ===================================================
            SECURITY
        ==================================================== */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Security & Access
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Application access and security controls
              </p>
            </div>

            <Lock size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <SettingRow
              icon={<Lock size={17} />}
              title="Authentication"
              description="Application access protection"
              right={
                <span className="status status-low">
                  Enabled
                </span>
              }
            />

            <SettingRow
              icon={<ShieldCheck size={17} />}
              title="API Protection"
              description="Backend API request validation"
              right={
                <span className="status status-low">
                  Active
                </span>
              }
            />

            <SettingRow
              icon={<Database size={17} />}
              title="Database Access"
              description="Protected MySQL connection"
              right={
                <span className="status status-low">
                  Secure
                </span>
              }
            />

            <SettingRow
              icon={<User size={17} />}
              title="Current Role"
              description="Current application permission level"
              right={
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Administrator
                </span>
              }
            />
          </div>
        </section>
      </div>

      {/* =====================================================
          SYSTEM INFORMATION
      ====================================================== */}

      <section
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              System Information
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              METROPOLIS application environment
            </p>
          </div>

          <Database size={18} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: 10,
            padding: 16,
          }}
        >
          <InfoBox
            label="Application"
            value="METROPOLIS"
          />

          <InfoBox
            label="Frontend"
            value="React + TypeScript"
          />

          <InfoBox
            label="Backend"
            value="Node + Express"
          />

          <InfoBox
            label="Database"
            value="MySQL"
          />
        </div>
      </section>

      {/* =====================================================
          SAVE AREA
      ====================================================== */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 18,
          paddingBottom: 20,
        }}
      >
        {saved && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              color: "#31d29a",
              fontSize: 12,
            }}
          >
            <Check size={15} />
            Settings saved successfully
          </div>
        )}

        <button
          type="button"
          className="report-generate-button"
          onClick={handleSave}
        >
          <Save size={15} />
          Save Settings
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   SETTING ROW
   ========================================================= */

function SettingRow({
  icon,
  title,
  description,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  right: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          flexShrink: 0,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(20,190,235,.06)",
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {title}
        </div>

        <div
          className="muted"
          style={{
            marginTop: 4,
            fontSize: 10,
          }}
        >
          {description}
        </div>
      </div>

      <div>{right}</div>
    </div>
  );
}

/* =========================================================
   TOGGLE
   ========================================================= */

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-label="Toggle setting"
      style={{
        width: 40,
        height: 22,
        padding: 2,
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        background: checked
          ? "rgba(24,201,239,.45)"
          : "rgba(100,130,145,.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: checked
          ? "flex-end"
          : "flex-start",
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: checked
            ? "#67dff5"
            : "#71848d",
          display: "block",
        }}
      />
    </button>
  );
}

/* =========================================================
   INFORMATION BOX
   ========================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 8,
        background: "rgba(5,20,32,.42)",
        border:
          "1px solid rgba(100,160,190,.08)",
      }}
    >
      <div
        className="muted"
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 7,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}