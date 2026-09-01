import {
  Activity,
  AlertTriangle,
  Car,
  Gauge,
  MapPin,
  TrendingUp,
  Zap,
} from "lucide-react";

const statistics = [
  {
    title: "Active Vehicles",
    value: "1,248",
    change: "+8.4%",
    icon: Car,
  },
  {
    title: "Traffic Flow",
    value: "72%",
    change: "+4.2%",
    icon: Activity,
  },
  {
    title: "Active Incidents",
    value: "07",
    change: "-12.5%",
    icon: AlertTriangle,
  },
  {
    title: "City Efficiency",
    value: "86.4%",
    change: "+6.8%",
    icon: Gauge,
  },
];

const zones = [
  {
    name: "Zone A",
    traffic: 82,
    vehicles: 384,
    status: "High",
  },
  {
    name: "Zone B",
    traffic: 64,
    vehicles: 291,
    status: "Moderate",
  },
  {
    name: "Zone C",
    traffic: 42,
    vehicles: 215,
    status: "Low",
  },
  {
    name: "Zone D",
    traffic: 71,
    vehicles: 358,
    status: "Moderate",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div>

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            City Intelligence
          </span>

        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
          METROPOLIS Control Center
        </h1>

        <p className="mt-1 text-xs text-slate-600">
          Real-time overview of the simulated urban environment.
        </p>

      </div>


      {/* STATISTICS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {statistics.map((stat) => {

          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                group
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                p-5
                transition
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/20
                hover:bg-cyan-400/[0.025]
              "
            >

              <div className="flex items-start justify-between">

                <div
                  className="
                    rounded-xl
                    bg-cyan-400/10
                    p-2.5
                  "
                >

                  <Icon
                    size={19}
                    className="text-cyan-400"
                  />

                </div>

                <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-medium text-emerald-400">
                  {stat.change}
                </span>

              </div>

              <p className="mt-5 text-[10px] uppercase tracking-wider text-slate-600">
                {stat.title}
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {stat.value}
              </p>

            </div>
          );
        })}

      </div>


      {/* MAIN GRID */}

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">

        {/* CITY STATUS */}

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-sm font-semibold text-white">
                City Activity
              </h2>

              <p className="mt-1 text-[10px] text-slate-600">
                Simulated activity across the digital twin
              </p>

            </div>

            <div className="rounded-lg bg-cyan-400/10 p-2">
              <TrendingUp
                size={16}
                className="text-cyan-400"
              />
            </div>

          </div>


          {/* GRAPH */}

          <div className="relative mt-6 h-[230px] overflow-hidden rounded-xl border border-white/[0.04] bg-[#07111e]">

            <div
              className="
                absolute
                inset-0
                opacity-20
                [background-image:linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.15)_1px,transparent_1px)]
                [background-size:40px_40px]
              "
            />

            <svg
              viewBox="0 0 800 230"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >

              <polyline
                points="0,170 80,145 160,155 240,110 320,125 400,80 480,95 560,60 640,75 720,45 800,58"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-cyan-400"
              />

              <polyline
                points="0,195 80,180 160,188 240,165 320,175 400,140 480,150 560,125 640,135 720,110 800,120"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5 7"
                className="text-slate-600"
              />

            </svg>


            <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[8px] text-slate-700">

              <span>08:00</span>
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
              <span>18:00</span>

            </div>

          </div>

        </div>


        {/* ZONES */}

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-sm font-semibold text-white">
                Zone Monitoring
              </h2>

              <p className="mt-1 text-[10px] text-slate-600">
                Current traffic conditions
              </p>

            </div>

            <MapPin
              size={17}
              className="text-slate-600"
            />

          </div>


          <div className="mt-5 space-y-4">

            {zones.map((zone) => (

              <div key={zone.name}>

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <span className="text-xs font-medium text-slate-300">
                      {zone.name}
                    </span>

                    <span className="text-[9px] text-slate-700">
                      {zone.vehicles} vehicles
                    </span>

                  </div>

                  <span
                    className={`
                      text-[9px]
                      font-medium
                      ${
                        zone.status === "High"
                          ? "text-rose-400"
                          : zone.status === "Moderate"
                            ? "text-amber-400"
                            : "text-emerald-400"
                      }
                    `}
                  >
                    {zone.status}
                  </span>

                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">

                  <div
                    className={`
                      h-full
                      rounded-full
                      transition-all
                      ${
                        zone.status === "High"
                          ? "bg-rose-400"
                          : zone.status === "Moderate"
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                      }
                    `}
                    style={{
                      width: `${zone.traffic}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* SYSTEM STATUS */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">

          <div className="rounded-xl bg-emerald-400/10 p-2.5">
            <Zap
              size={17}
              className="text-emerald-400"
            />
          </div>

          <div>

            <p className="text-[10px] text-slate-600">
              Simulation Engine
            </p>

            <p className="mt-1 text-xs font-medium text-emerald-400">
              Running
            </p>

          </div>

        </div>


        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">

          <div className="rounded-xl bg-cyan-400/10 p-2.5">
            <Activity
              size={17}
              className="text-cyan-400"
            />
          </div>

          <div>

            <p className="text-[10px] text-slate-600">
              Data Synchronization
            </p>

            <p className="mt-1 text-xs font-medium text-cyan-400">
              Live
            </p>

          </div>

        </div>


        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">

          <div className="rounded-xl bg-violet-400/10 p-2.5">
            <Gauge
              size={17}
              className="text-violet-400"
            />
          </div>

          <div>

            <p className="text-[10px] text-slate-600">
              AI Analytics
            </p>

            <p className="mt-1 text-xs font-medium text-violet-400">
              Ready
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}