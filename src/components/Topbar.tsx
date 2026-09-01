import {
  Bell,
  Menu,
  Search,
  Wifi,
} from "lucide-react";

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({
  onMenuClick,
}: TopBarProps) {
  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-[80]
        flex
        h-[76px]
        items-center
        border-b
        border-white/[0.06]
        bg-[#050b14]/90
        px-4
        backdrop-blur-xl
        lg:left-[250px]
        lg:px-6
      "
    >

      {/* MOBILE MENU */}

      <button
        onClick={onMenuClick}
        className="
          mr-3
          rounded-xl
          p-2
          text-slate-400
          hover:bg-white/5
          hover:text-white
          lg:hidden
        "
      >
        <Menu size={20} />
      </button>


      {/* SEARCH */}

      <div className="relative hidden w-[300px] md:block">

        <Search
          size={16}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-600
          "
        />

        <input
          placeholder="Search city data..."
          className="
            h-10
            w-full
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.025]
            pl-10
            pr-4
            text-xs
            text-white
            outline-none
            placeholder:text-slate-700
            focus:border-cyan-400/30
          "
        />

      </div>


      <div className="ml-auto flex items-center gap-3">


        {/* CONNECTION */}

        <div className="hidden items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2 sm:flex">

          <Wifi
            size={14}
            className="text-emerald-400"
          />

          <span className="text-[9px] font-medium text-emerald-400">
            CONNECTED
          </span>

        </div>


        {/* TIME */}

        <div className="hidden border-l border-white/[0.06] pl-3 text-right md:block">

          <p className="text-[9px] uppercase tracking-wider text-slate-700">
            Simulation Time
          </p>

          <p className="text-xs font-medium text-slate-300">
            10:42:18
          </p>

        </div>


        {/* NOTIFICATION */}

        <button
          className="
            relative
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.025]
            p-2.5
            text-slate-500
            transition
            hover:border-cyan-400/20
            hover:text-cyan-400
          "
        >

          <Bell size={17} />

          <span
            className="
              absolute
              right-2
              top-2
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-400
            "
          />

        </button>


        {/* PROFILE */}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.025]
            px-2.5
            py-1.5
          "
        >

          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-cyan-400/10
              text-[10px]
              font-bold
              text-cyan-400
            "
          >
            M
          </div>

          <div className="hidden sm:block">

            <p className="text-[10px] font-medium text-slate-300">
              Admin
            </p>

            <p className="text-[8px] text-slate-600">
              Control Center
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}