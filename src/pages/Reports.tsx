import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Download,
  FileBarChart,
  FileText,
  Gauge,
  RefreshCw,
  TrendingUp,
  TriangleAlert,
  Car,
} from "lucide-react";

const reportCards = [
  {
    title: "Traffic Performance",
    description:
      "Traffic flow, congestion levels and average vehicle speed.",
    icon: TrendingUp,
    value: "78%",
    label: "Traffic Flow",
  },
  {
    title: "Vehicle Activity",
    description:
      "Vehicle movement, active vehicles and vehicle distribution.",
    icon: Car,
    value: "128",
    label: "Active Vehicles",
  },
  {
    title: "Incident Analysis",
    description:
      "Incident count, severity and incident distribution by zone.",
    icon: TriangleAlert,
    value: "08",
    label: "Active Incidents",
  },
  {
    title: "System Analytics",
    description:
      "AI analytics, simulation performance and system activity.",
    icon: Gauge,
    value: "94%",
    label: "AI Quality",
  },
];

const reportHistory = [
  {
    name: "Daily Traffic Intelligence Report",
    type: "Traffic",
    date: "28 Sep 2026",
    status: "Generated",
  },
  {
    name: "Vehicle Activity Report",
    type: "Vehicles",
    date: "28 Sep 2026",
    status: "Generated",
  },
  {
    name: "Incident Summary Report",
    type: "Incidents",
    date: "27 Sep 2026",
    status: "Generated",
  },
  {
    name: "Zone Congestion Analysis",
    type: "Zones",
    date: "27 Sep 2026",
    status: "Generated",
  },
];

export default function Reports() {
  const handleDownload = (reportName: string) => {
    const reportContent = `
METROPOLIS
Digital Twin Platform

${reportName}

Generated: ${new Date().toLocaleString()}

----------------------------------------
SYSTEM SUMMARY
----------------------------------------

Traffic Flow: 78%
Average Speed: 32 km/h
Active Vehicles: 128
Active Incidents: 08
AI Quality: 94%

----------------------------------------
ZONE CONGESTION
----------------------------------------

Zone A: 72%
Zone B: 58%
Zone C: 41%
Zone D: 29%

----------------------------------------
REPORT STATUS
----------------------------------------

This report was generated from the METROPOLIS
digital twin simulation environment.
`;

    const blob = new Blob([reportContent], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportName
      .replace(/\s+/g, "-")
      .toLowerCase()}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="metropolis-page">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>

          <p className="page-subtitle">
            Generate and review METROPOLIS city intelligence reports
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span className="live-pill">
            <span className="live-dot" />
            SYSTEM LIVE
          </span>

          <button
            className="report-action-button"
            onClick={() =>
              handleDownload("METROPOLIS City Intelligence Report")
            }
          >
            <Download size={15} />
            Export Report
          </button>
        </div>
      </div>

      {/* =====================================================
          REPORT SUMMARY
      ====================================================== */}

      <div className="grid-4">
        {reportCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              className="panel"
              key={card.title}
              style={{
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 10,
                    background: "rgba(34, 211, 238, 0.08)",
                    color: "#22d3ee",
                  }}
                >
                  <Icon size={18} />
                </div>

                <FileBarChart
                  size={15}
                  className="muted"
                />
              </div>

              <div
                style={{
                  marginTop: 18,
                }}
              >
                <div className="kpi-label">
                  {card.label}
                </div>

                <div className="kpi-value">
                  {card.value}
                </div>
              </div>

              <p
                className="muted"
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  lineHeight: 1.5,
                }}
              >
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          REPORT GENERATOR
      ====================================================== */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Generate Report
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 4,
                  fontSize: 10,
                }}
              >
                Select a report type and reporting period
              </p>
            </div>

            <FileText
              size={17}
              className="muted"
            />
          </div>

          <div
            style={{
              padding: 20,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 7,
                    color: "#6f8799",
                    fontSize: 10,
                  }}
                >
                  Report Type
                </label>

                <select
                  className="report-select"
                  defaultValue="City Intelligence"
                >
                  <option>
                    City Intelligence
                  </option>

                  <option>
                    Traffic Performance
                  </option>

                  <option>
                    Vehicle Activity
                  </option>

                  <option>
                    Incident Analysis
                  </option>

                  <option>
                    Zone Congestion
                  </option>

                  <option>
                    AI Analytics
                  </option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: 7,
                    color: "#6f8799",
                    fontSize: 10,
                  }}
                >
                  Reporting Period
                </label>

                <select
                  className="report-select"
                  defaultValue="Today"
                >
                  <option>Today</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>

            <div
              style={{
                marginTop: 15,
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: 7,
                  color: "#6f8799",
                  fontSize: 10,
                }}
              >
                Report Date
              </label>

              <div
                className="report-date-input"
              >
                <CalendarDays size={14} />

                <span>
                  {new Date().toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
            </div>

            <button
              className="report-generate-button"
              onClick={() =>
                handleDownload(
                  "METROPOLIS City Intelligence Report",
                )
              }
            >
              <FileBarChart size={15} />
              Generate & Download
            </button>
          </div>
        </div>

        {/* ===================================================
            REPORT INFORMATION
        ==================================================== */}

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Report Information
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 4,
                  fontSize: 10,
                }}
              >
                Current simulation intelligence
              </p>
            </div>

            <RefreshCw
              size={15}
              className="muted"
            />
          </div>

          <div
            style={{
              padding: 20,
            }}
          >
            <div className="report-info-row">
              <span>Traffic Flow</span>
              <strong>78%</strong>
            </div>

            <div className="report-progress">
              <div
                style={{
                  width: "78%",
                }}
              />
            </div>

            <div className="report-info-row">
              <span>Average Speed</span>
              <strong>32 km/h</strong>
            </div>

            <div className="report-progress">
              <div
                style={{
                  width: "64%",
                }}
              />
            </div>

            <div className="report-info-row">
              <span>Vehicle Activity</span>
              <strong>128</strong>
            </div>

            <div className="report-progress">
              <div
                style={{
                  width: "82%",
                }}
              />
            </div>

            <div className="report-info-row">
              <span>AI Quality</span>
              <strong>94%</strong>
            </div>

            <div className="report-progress">
              <div
                style={{
                  width: "94%",
                }}
              />
            </div>

            <div
              style={{
                marginTop: 20,
                padding: 12,
                borderRadius: 10,
                border:
                  "1px solid rgba(34, 197, 94, 0.12)",
                background:
                  "rgba(34, 197, 94, 0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#4ade80",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 size={14} />

                Simulation data ready
              </div>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 9,
                }}
              >
                All major METROPOLIS intelligence
                modules are available for reporting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          REPORT HISTORY
      ====================================================== */}

      <div
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Recent Reports
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 4,
                fontSize: 10,
              }}
            >
              Previously generated intelligence reports
            </p>
          </div>

          <BarChart3
            size={16}
            className="muted"
          />
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reportHistory.map((report) => (
                <tr key={report.name}>
                  <td>
                    <div className="report-name">
                      <span className="report-file-icon">
                        <FileText size={14} />
                      </span>

                      <strong>
                        {report.name}
                      </strong>
                    </div>
                  </td>

                  <td>
                    <span className="report-type">
                      {report.type}
                    </span>
                  </td>

                  <td className="muted">
                    {report.date}
                  </td>

                  <td>
                    <span className="report-status">
                      <span />
                      {report.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="report-download-button"
                      onClick={() =>
                        handleDownload(
                          report.name,
                        )
                      }
                    >
                      <Download size={13} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#536b7c",
          fontSize: 9,
        }}
      >
        <span>
          METROPOLIS Digital Twin Platform
        </span>

        <span>
          Reports generated from simulated city data
        </span>
      </div>
    </div>
  );
}