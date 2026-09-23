import {
  Activity,
  BarChart3,
  Car,
  FileText,
  Gauge,
  LayoutDashboard,
  Map,
  Route,
  Settings,
  TriangleAlert,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

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

export default function Sidebar({
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[100]
          flex
          h-screen
          w-[230px]
          flex-col
          border-r
          border-cyan-400/10
          bg-[#06111b]
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO */}

        <div className="flex h-[82px] items-center border-b border-white/[0.06] px-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10" />

              <div className="relative flex items-end gap-[2px]">
                <span className="h-4 w-[4px] bg-cyan-400" />
                <span className="h-6 w-[4px] bg-cyan-400" />
                <span className="h-8 w-[4px] bg-cyan-400" />
                <span className="h-5 w-[4px] bg-cyan-400" />
                <span className="h-7 w-[4px] bg-cyan-400" />
              </div>
            </div>

            <div>
              <h1 className="text-[17px] font-bold tracking-[0.08em] text-white">
                METROPOLIS
              </h1>

              <p className="mt-0.5 text-[8px] uppercase tracking-[0.16em] text-slate-500">
                AI-Enabled Digital Twin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={17} />
          </button>
        </div>

        {/* SYSTEM STATUS */}

        <div className="mx-3 mt-4 rounded-lg border border-cyan-400/10 bg-cyan-400/[0.025] px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[10px] font-medium text-emerald-400">
              SYSTEM OPERATIONAL
            </span>
          </div>

          <p className="mt-1 pl-4 text-[8px] text-slate-600">
            Simulation engine active
          </p>
        </div>

        {/* NAVIGATION */}

        <nav className="mt-5 flex-1 px-2">
          <p className="mb-2 px-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            CITY OPERATIONS
          </p>

          <div className="space-y-[2px]">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    h-[39px]
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    text-[12px]
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-cyan-400/[0.10] text-cyan-300"
                        : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                      )}

                      <Icon
                        size={17}
                        strokeWidth={isActive ? 2 : 1.7}
                        className={
                          isActive
                            ? "text-cyan-400"
                            : "text-slate-600 group-hover:text-slate-300"
                        }
                      />

                      <span className="font-medium">
                        {item.label}
                      </span>

                      {item.label === "Live Map" && (
                        <span className="ml-auto flex items-center gap-1">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

                          <span className="text-[7px] font-medium text-cyan-400">
                            LIVE
                          </span>
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* BOTTOM */}

        <div className="border-t border-white/[0.06] p-2">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `
              flex
              h-[39px]
              items-center
              gap-3
              rounded-lg
              px-3
              text-[12px]
              transition
              ${
                isActive
                  ? "bg-white/[0.05] text-white"
                  : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
              }
              `
            }
          >
            <Settings size={17} />

            <span>Settings</span>
          </NavLink>

          <div className="mt-2 flex items-center gap-3 rounded-lg bg-white/[0.025] p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-bold text-cyan-400">
              M
            </div>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-medium text-slate-300">
                Metropolis Admin
              </p>

              <p className="truncate text-[8px] text-slate-600">
                Control Center
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}