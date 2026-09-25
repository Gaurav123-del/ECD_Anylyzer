import { useState } from "react";

import {
  Activity,
  Bell,
  ChevronDown,
  Grid2X2,
  History as HistoryIcon,
  Info,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: Grid2X2,
  },
  {
    label: "History",
    path: "/history",
    icon: HistoryIcon,
  },
  {
    label: "About",
    path: "/about",
    icon: Info,
  },
];

function Header() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[76px] lg:px-8">

        {/* ==================================================
            LOGO
        =================================================== */}

        <NavLink
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
            <Activity size={23} strokeWidth={2.2} />
          </div>

          <div className="hidden min-w-0 sm:block">
            <div className="flex items-center gap-2">
              <span className="truncate text-base font-bold tracking-tight text-slate-950 lg:text-lg">
                ECG Analyzer
              </span>

              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-600">
                AI
              </span>
            </div>

            <p className="truncate text-[11px] font-medium text-slate-400">
              Intelligent ECG Analysis
            </p>
          </div>
        </NavLink>

        {/* ==================================================
            DESKTOP NAV
        =================================================== */}

        <nav className="hidden items-center rounded-2xl border border-slate-200 bg-slate-50/80 p-1 lg:flex">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:bg-white/70 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={17} />

                    {item.label}

                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-blue-600" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ==================================================
            RIGHT SIDE
        =================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* System status */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            System Ready
          </div>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 sm:flex"
          >
            <Bell size={19} />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* User */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50 sm:flex"
          >
            <div className="relative">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-600/20">
                GK
              </div>

              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />

            </div>

            <div className="hidden text-left md:block">
              <p className="text-xs font-bold text-slate-900">
                Gaurav Kumar
              </p>

              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <ShieldCheck size={10} className="text-blue-500" />
                User
              </div>
            </div>

            <ChevronDown
              size={15}
              className="ml-1 text-slate-400"
            />
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
            onClick={() =>
              setMobileOpen((value) => !value)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* ====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 shadow-lg lg:hidden">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
              GK
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900">
                Gaurav Kumar
              </p>

              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <ShieldCheck
                  size={11}
                  className="text-blue-500"
                />

                User
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              Ready
            </div>

          </div>

          <nav className="grid gap-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50",
                    ].join(" ")
                  }
                >
                  <Icon size={18} />

                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            System Ready
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;