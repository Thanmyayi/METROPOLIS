import {
  BarChart3,
  CalendarDays,
  Download,
  FileBarChart,
  FileText,
  Gauge,
  RefreshCw,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";

const reportStats = [
  {
    title: "Traffic Reports",
    value: "24",
    description: "Generated this month",
    icon: BarChart3,
  },
  {
    title: "Vehicle Reports",
    value: "18",
    description: "Tracking summaries",
    icon: Truck,
  },
  {
    title: "Incident Reports",
    value: "09",
    description: "Incident analysis",
    icon: FileBarChart,
  },
  {
    title: "Analytics Reports",
    value: "15",
    description: "AI-generated insights",
    icon: TrendingUp,
  },
];

const recentReports = [
  {
    name: "Daily Traffic Analysis",
    type: "Traffic",
    date: "Today, 06:30 PM",
    status: "Ready",
  },
  {
    name: "Vehicle Activity Report",
    type: "Vehicles",
    date: "Today, 05:45 PM",
    status: "Ready",
  },
  {
    name: "Zone Performance Report",
    type: "Zones",
    date: "Yesterday, 08:20 PM",
    status: "Ready",
  },
  {
    name: "Incident Summary",
    type: "Incidents",
    date: "Yesterday, 06:10 PM",
    status: "Ready",
  },
  {
    name: "AI Analytics Summary",
    type: "Analytics",
    date: "28 Sep 2026, 07:15 PM",
    status: "Ready",
  },
];

export default function Reports() {
  return (
    <div className="metropolis-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Insights</h1>
          <p className="page-subtitle">
            Generate, review and download METROPOLIS operational reports
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          REPORTING ENGINE
        </div>
      </div>

      {/* REPORT STATISTICS */}
      <div className="grid-4">
        {reportStats.map((item) => {
          const Icon = item.icon;

          return (
            <div className="panel kpi-card" key={item.title}>
              <Icon size={22} />

              <div
                className="kpi-label"
                style={{ marginTop: 14 }}
              >
                {item.title}
              </div>

              <div className="kpi-value">
                {item.value}
              </div>

              <div className="kpi-change">
                {item.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* GENERATE REPORT */}
      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "stretch",
        }}
      >
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Generate New Report
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Select the required report type and reporting period
              </p>
            </div>

            <FileText size={18} />
          </div>

          <div style={{ padding: 20 }}>
            <div className="report-form-grid">
              <div className="report-field">
                <label>Report Type</label>

                <select defaultValue="traffic">
                  <option value="traffic">
                    Traffic Analysis
                  </option>

                  <option value="vehicles">
                    Vehicle Activity
                  </option>

                  <option value="incidents">
                    Incident Summary
                  </option>

                  <option value="zones">
                    Zone Performance
                  </option>

                  <option value="analytics">
                    AI Analytics
                  </option>

                  <option value="system">
                    System Overview
                  </option>
                </select>
              </div>

              <div className="report-field">
                <label>Time Period</label>

                <select defaultValue="today">
                  <option value="today">
                    Today
                  </option>

                  <option value="7days">
                    Last 7 Days
                  </option>

                  <option value="30days">
                    Last 30 Days
                  </option>

                  <option value="month">
                    This Month
                  </option>
                </select>
              </div>
            </div>

            <div
              className="report-field"
              style={{ marginTop: 16 }}
            >
              <label>Report Description</label>

              <textarea
                rows={4}
                placeholder="Add an optional description for this report..."
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 18,
              }}
            >
              <button
                type="button"
                className="report-generate-button"
                onClick={() =>
                  alert("Report generation started")
                }
              >
                <FileBarChart size={16} />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* REPORT OVERVIEW */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Current City Overview
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Latest operational indicators
              </p>
            </div>

            <Gauge size={18} />
          </div>

          <div style={{ padding: 20 }}>
            <OverviewRow
              label="Traffic Flow"
              value="78%"
              progress={78}
            />

            <OverviewRow
              label="Average Vehicle Speed"
              value="32 km/h"
              progress={64}
            />

            <OverviewRow
              label="Vehicle Activity"
              value="128 active"
              progress={82}
            />

            <OverviewRow
              label="City Performance"
              value="91%"
              progress={91}
            />

            <OverviewRow
              label="System Availability"
              value="99.8%"
              progress={99.8}
            />
          </div>
        </div>
      </div>

      {/* RECENT REPORTS */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Recent Reports
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Previously generated METROPOLIS reports
            </p>
          </div>

          <button
            type="button"
            className="report-action-button"
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Category</th>
                <th>Generated</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {recentReports.map((report) => (
                <tr key={report.name}>
                  <td>
                    <div className="report-name">
                      <FileText size={16} />
                      {report.name}
                    </div>
                  </td>

                  <td>
                    <span className="report-category">
                      {report.type}
                    </span>
                  </td>

                  <td className="muted">
                    {report.date}
                  </td>

                  <td>
                    <span className="report-status">
                      <span className="report-status-dot" />
                      {report.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="report-download-button"
                      onClick={() =>
                        alert(
                          `Preparing ${report.name} for download`
                        )
                      }
                    >
                      <Download size={15} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK REPORT TYPES */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Quick Reports
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Quickly create commonly used reports
            </p>
          </div>

          <Zap size={18} />
        </div>

        <div className="quick-report-grid">
          <QuickReport
            icon={<BarChart3 size={20} />}
            title="Traffic Report"
            description="Traffic flow and congestion"
          />

          <QuickReport
            icon={<Truck size={20} />}
            title="Vehicle Report"
            description="Vehicle activity and movement"
          />

          <QuickReport
            icon={<FileBarChart size={20} />}
            title="Incident Report"
            description="Active and resolved incidents"
          />

          <QuickReport
            icon={<TrendingUp size={20} />}
            title="Analytics Report"
            description="AI-based city insights"
          />

          <QuickReport
            icon={<MapIcon />}
            title="Zone Report"
            description="Zone-wise performance"
          />

          <QuickReport
            icon={<CalendarDays size={20} />}
            title="Daily Summary"
            description="Complete daily overview"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   OVERVIEW ROW
   ========================================================= */

function OverviewRow({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div
      style={{
        marginBottom: 19,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 7,
        }}
      >
        <span>{label}</span>

        <strong>{value}</strong>
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   QUICK REPORT
   ========================================================= */

function QuickReport({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="quick-report-card"
      onClick={() =>
        alert(`${title} generation started`)
      }
    >
      <div className="quick-report-icon">
        {icon}
      </div>

      <div>
        <div className="quick-report-title">
          {title}
        </div>

        <div className="quick-report-description">
          {description}
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   MAP ICON
   ========================================================= */

function MapIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}