import {
  BarChart3,
  Download,
  FileText,
  Calendar,
  TrendingUp,
  Car,
  AlertTriangle,
  Activity,
  Clock,
} from "lucide-react";

const Reports = () => {
  const reportCards = [
    {
      title: "Traffic Performance",
      description: "Traffic flow, congestion and average speed analysis",
      icon: Activity,
      value: "86%",
      label: "Efficiency",
    },
    {
      title: "Vehicle Activity",
      description: "Vehicle movement and simulation statistics",
      icon: Car,
      value: "128",
      label: "Active Vehicles",
    },
    {
      title: "Incident Analysis",
      description: "Road incidents and affected zones",
      icon: AlertTriangle,
      value: "08",
      label: "Incidents",
    },
    {
      title: "System Performance",
      description: "Digital twin simulation performance",
      icon: TrendingUp,
      value: "94%",
      label: "System Health",
    },
  ];

  const monthlyData = [
    { month: "Jan", traffic: 62 },
    { month: "Feb", traffic: 70 },
    { month: "Mar", traffic: 65 },
    { month: "Apr", traffic: 78 },
    { month: "May", traffic: 86 },
    { month: "Jun", traffic: 81 },
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-white p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
              <FileText className="text-cyan-400" size={22} />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Reports
              </h1>
              <p className="text-slate-400 text-sm">
                METROPOLIS city intelligence reports
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <Calendar size={17} />
            May 2026
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition">
            <Download size={17} />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {reportCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-5 hover:border-cyan-400/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                  <Icon className="text-cyan-400" size={20} />
                </div>

                <TrendingUp
                  size={16}
                  className="text-emerald-400"
                />
              </div>

              <div className="mt-5">
                <p className="text-slate-400 text-sm">{card.title}</p>

                <div className="flex items-end gap-2 mt-1">
                  <span className="text-2xl font-semibold">
                    {card.value}
                  </span>

                  <span className="text-xs text-emerald-400 mb-1">
                    {card.label}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Report Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Traffic Report */}
        <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                Traffic Performance
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Monthly traffic efficiency overview
              </p>
            </div>

            <BarChart3 className="text-cyan-400" size={21} />
          </div>

          <div className="h-64 flex items-end justify-between gap-4 border-b border-white/10 px-2">
            {monthlyData.map((item) => (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-3"
              >
                <div className="text-xs text-slate-400">
                  {item.traffic}%
                </div>

                <div
                  className="w-full max-w-[55px] rounded-t-xl bg-gradient-to-t from-cyan-600/30 to-cyan-400 transition-all duration-500 hover:from-cyan-500/50"
                  style={{
                    height: `${item.traffic * 2}px`,
                  }}
                />

                <span className="text-xs text-slate-500">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Report Generator */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
          <h2 className="text-lg font-semibold">
            Generate Report
          </h2>

          <p className="text-sm text-slate-400 mt-1 mb-6">
            Select the information you want to analyze.
          </p>

          <div className="space-y-3">
            {[
              "Traffic Analysis",
              "Vehicle Movement",
              "Incident Summary",
              "Zone Performance",
              "AI Analytics",
            ].map((item, index) => (
              <label
                key={item}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-black/20 hover:border-cyan-400/30 transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked={index < 3}
                  className="accent-cyan-400"
                />

                <span className="text-sm text-slate-300">
                  {item}
                </span>
              </label>
            ))}
          </div>

          <button className="w-full mt-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition">
            Generate Report
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold">
              Recent Reports
            </h2>

            <p className="text-sm text-slate-400">
              Previously generated city reports
            </p>
          </div>

          <FileText className="text-cyan-400" size={20} />
        </div>

        <div className="space-y-3">
          {[
            {
              name: "Traffic Performance Report",
              date: "May 18, 2026",
              type: "Traffic",
            },
            {
              name: "Vehicle Simulation Report",
              date: "May 17, 2026",
              type: "Vehicles",
            },
            {
              name: "Incident Analysis Report",
              date: "May 16, 2026",
              type: "Incidents",
            },
          ].map((report) => (
            <div
              key={report.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-white/10 bg-black/20 hover:border-cyan-400/20 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                  <FileText size={18} className="text-cyan-400" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {report.name}
                  </p>

                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500">
                      {report.date}
                    </span>

                    <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-400">
                      {report.type}
                    </span>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
                <Download size={16} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer status */}
      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
        <Clock size={14} />
        Last report update: 10:24:35 AM
        <span className="text-emerald-400">● System Operational</span>
      </div>
    </div>
  );
};

export default Reports;