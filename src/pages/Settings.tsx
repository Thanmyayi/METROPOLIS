import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Map,
  Activity,
  Palette,
  Database,
  Save,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#050b14] text-white p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <SettingsIcon
              className="text-cyan-400"
              size={22}
            />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Settings
            </h1>

            <p className="text-slate-400 text-sm">
              Configure your METROPOLIS digital twin environment
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4 h-fit">
          <div className="space-y-2">
            {[
              {
                name: "General",
                icon: SettingsIcon,
                active: true,
              },
              {
                name: "Profile",
                icon: User,
                active: false,
              },
              {
                name: "Notifications",
                icon: Bell,
                active: false,
              },
              {
                name: "Security",
                icon: Shield,
                active: false,
              },
              {
                name: "Map & Simulation",
                icon: Map,
                active: false,
              },
              {
                name: "System",
                icon: Database,
                active: false,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                    item.active
                      ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* General Settings */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon
                className="text-cyan-400"
                size={20}
              />

              <div>
                <h2 className="text-lg font-semibold">
                  General Settings
                </h2>

                <p className="text-sm text-slate-400">
                  Basic platform configuration
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-slate-400">
                  City Name
                </label>

                <input
                  type="text"
                  defaultValue="METROPOLIS"
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400/50 transition"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">
                  Time Zone
                </label>

                <select className="w-full mt-2 px-4 py-3 rounded-xl bg-[#09111e] border border-white/10 outline-none focus:border-cyan-400/50">
                  <option>Asia/Kolkata</option>
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                </select>
              </div>
            </div>
          </div>

          {/* Simulation Settings */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Activity
                className="text-cyan-400"
                size={20}
              />

              <div>
                <h2 className="text-lg font-semibold">
                  Simulation Settings
                </h2>

                <p className="text-sm text-slate-400">
                  Control real-time digital twin simulation
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <SettingRow
                title="Real-Time Simulation"
                description="Continuously update vehicles and traffic"
                enabled={true}
              />

              <SettingRow
                title="Vehicle Movement"
                description="Allow simulated vehicles to move dynamically"
                enabled={true}
              />

              <SettingRow
                title="Traffic Updates"
                description="Automatically update traffic conditions"
                enabled={true}
              />

              <SettingRow
                title="Incident Simulation"
                description="Generate simulated city incidents"
                enabled={false}
              />
            </div>
          </div>

          {/* Map Settings */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Map
                className="text-cyan-400"
                size={20}
              />

              <div>
                <h2 className="text-lg font-semibold">
                  Map Settings
                </h2>

                <p className="text-sm text-slate-400">
                  Configure digital twin map appearance
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-slate-400">
                  Default Map View
                </label>

                <select className="w-full mt-2 px-4 py-3 rounded-xl bg-[#09111e] border border-white/10">
                  <option>Digital Twin</option>
                  <option>Satellite</option>
                  <option>Street Map</option>
                  <option>Traffic</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-400">
                  Vehicle Display
                </label>

                <select className="w-full mt-2 px-4 py-3 rounded-xl bg-[#09111e] border border-white/10">
                  <option>Detailed</option>
                  <option>Compact</option>
                  <option>Minimal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette
                className="text-cyan-400"
                size={20}
              />

              <div>
                <h2 className="text-lg font-semibold">
                  Appearance
                </h2>

                <p className="text-sm text-slate-400">
                  Customize the interface
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 p-4 rounded-xl border border-cyan-400 bg-[#050b14]">
                <div className="h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 mb-3" />
                <span className="text-sm">
                  METROPOLIS Dark
                </span>
              </button>

              <button className="flex-1 p-4 rounded-xl border border-white/10 bg-black/20 hover:border-white/20">
                <div className="h-8 rounded-lg bg-slate-300 mb-3" />
                <span className="text-sm text-slate-400">
                  Light
                </span>
              </button>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingRow = ({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-black/20">
      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="text-xs text-slate-500 mt-1">
          {description}
        </p>
      </div>

      <div
        className={`w-11 h-6 rounded-full p-1 transition ${
          enabled
            ? "bg-cyan-500"
            : "bg-slate-700"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform ${
            enabled
              ? "translate-x-5"
              : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default Settings;