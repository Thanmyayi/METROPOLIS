import {
  Bell,
  Database,
  Monitor,
  Save,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [simulation, setSimulation] =
    useState(true);

  const [notifications, setNotifications] =
    useState(true);

  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            System Settings
          </h1>

          <p className="page-subtitle">
            Configure METROPOLIS simulation and platform preferences
          </p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="panel settings-section">
          <div className="settings-heading">
            <Monitor />

            <div>
              <h3>
                Simulation Engine
              </h3>

              <p>
                Configure real-time simulation behaviour
              </p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                Vehicle Simulation
              </strong>

              <span>
                Automatically move simulated vehicles
              </span>
            </div>

            <button
              className={`toggle ${
                simulation ? "enabled" : ""
              }`}
              onClick={() =>
                setSimulation(
                  !simulation,
                )
              }
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                Simulation Speed
              </strong>

              <span>
                Vehicle update frequency
              </span>
            </div>

            <select>
              <option>Normal</option>
              <option>Fast</option>
              <option>Slow</option>
            </select>
          </div>
        </div>

        <div className="panel settings-section">
          <div className="settings-heading">
            <Bell />

            <div>
              <h3>
                Notifications
              </h3>

              <p>
                Configure system alerts
              </p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                Incident Alerts
              </strong>

              <span>
                Notify when incidents are detected
              </span>
            </div>

            <button
              className={`toggle ${
                notifications
                  ? "enabled"
                  : ""
              }`}
              onClick={() =>
                setNotifications(
                  !notifications,
                )
              }
            >
              <span />
            </button>
          </div>
        </div>

        <div className="panel settings-section">
          <div className="settings-heading">
            <Database />

            <div>
              <h3>
                Data & Backend
              </h3>

              <p>
                Platform data configuration
              </p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                Backend Status
              </strong>

              <span>
                API connection
              </span>
            </div>

            <span className="status status-low">
              Connected
            </span>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                Database
              </strong>

              <span>
                METROPOLIS data store
              </span>
            </div>

            <span className="status status-low">
              Online
            </span>
          </div>
        </div>

        <div className="panel settings-section">
          <div className="settings-heading">
            <Shield />

            <div>
              <h3>
                Security
              </h3>

              <p>
                Platform security configuration
              </p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                Admin Access
              </strong>

              <span>
                Administrator control enabled
              </span>
            </div>

            <span className="status status-low">
              Active
            </span>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                API Security
              </strong>

              <span>
                Protected backend endpoints
              </span>
            </div>

            <span className="status status-low">
              Enabled
            </span>
          </div>
        </div>
      </div>

      <button className="settings-save-button">
        <Save size={15} />
        Save Settings
      </button>

      <div className="settings-footer">
        <SlidersHorizontal size={14} />
        METROPOLIS Digital Twin Platform
      </div>
    </div>
  );
}