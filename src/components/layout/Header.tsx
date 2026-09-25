import { useState } from "react";
import {
  Activity,
  Bell,
  ChevronDown,
  History as HistoryIcon,
  Info,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  NavLink,
  useLocation,
} from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md transition group-hover:bg-blue-500/30" />

            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
              <Activity
                size={21}
                strokeWidth={2.4}
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-bold tracking-tight text-slate-950">
                ECG Analyzer
              </p>

              <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-600">
                AI
              </span>
            </div>

            <p className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-400">
              Intelligent ECG Analysis
            </p>
          </div>
        </NavLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-xl border border-slate-200/80 bg-slate-50/80 p-1 md:flex">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={[
                  "relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                  active
                    ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200/70"
                    : "text-slate-500 hover:bg-white/70 hover:text-slate-900",
                ].join(" ")}
              >
                <Icon
                  size={15}
                  strokeWidth={active ? 2.3 : 2}
                />

                {item.label}

                {active && (
                  <span className="absolute -bottom-[5px] left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-600" />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[11px] font-semibold text-emerald-700">
              System Ready
            </span>
          </div>

          <button
            type="button"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-slate-500 transition-all hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell
              size={18}
              strokeWidth={2}
              className="transition-transform group-hover:scale-105"
            />

            <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full border-2 border-white bg-blue-600" />
          </button>

          <div className="hidden h-7 w-px bg-slate-200 sm:block" />

          <div className="hidden items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-slate-200 hover:bg-slate-50 sm:flex">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[11px] font-bold text-white shadow-md shadow-blue-600/15">
                GK
              </div>

              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="hidden lg:block">
              <p className="text-xs font-bold leading-tight text-slate-900">
                Gaurav Kumar
              </p>

              <div className="mt-0.5 flex items-center gap-1">
                <ShieldCheck
                  size={10}
                  className="text-blue-500"
                />

                <p className="text-[10px] font-medium text-slate-400">
                  User
                </p>
              </div>
            </div>

            <ChevronDown
              size={14}
              className="hidden text-slate-400 lg:block"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileOpen((current) => !current)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 md:hidden"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-xl md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="mb-3 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                  <Activity size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    ECG Analyzer
                  </p>

                  <p className="text-[11px] text-slate-500">
                    AI-assisted ECG analysis
                  </p>
                </div>

                <div className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <span className="text-[10px] font-semibold text-emerald-700">
                    Ready
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all",
                      active
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-lg",
                        active
                          ? "bg-white text-blue-600 shadow-sm"
                          : "bg-slate-100 text-slate-500",
                      ].join(" ")}
                    >
                      <Icon size={18} />
                    </div>

                    <span>{item.label}</span>

                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                  GK
                </div>

                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-50 bg-emerald-500" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Gaurav Kumar
                </p>

                <div className="mt-0.5 flex items-center gap-1">
                  <ShieldCheck
                    size={11}
                    className="text-blue-500"
                  />

                  <p className="text-[11px] font-medium text-slate-500">
                    User account
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;