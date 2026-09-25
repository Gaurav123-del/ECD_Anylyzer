import {
  Activity,
  Bell,
  ChevronDown,
  Clock3,
  Info,
  LayoutDashboard,
  // UserCircle,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[74px] max-w-[1500px] items-center px-5 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
            <Activity
              className="h-6 w-6 text-white"
              strokeWidth={2.5}
            />
          </div>

          <div>
            <h1 className="text-lg font-bold leading-tight text-slate-900">
              ECG Analyzer
            </h1>

            <p className="text-xs text-slate-500">
              AI-Powered ECG Analysis
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="ml-12 flex h-full items-center gap-2">
          <Link
            to="/"
            className={`flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition ${
              isActive("/")
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            to="/history"
            className={`flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-medium transition ${
              isActive("/history")
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            <Clock3 className="h-4 w-4" />
            History
          </Link>

          <Link
            to="/about"
            className={`flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-medium transition ${
              isActive("/about")
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            }`}
          >
            <Info className="h-4 w-4" />
            About
          </Link>
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Bell className="h-5 w-5" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              GK
            </div>

            <span className="hidden text-sm font-semibold text-slate-700 md:block">
              Gaurav Kumar
            </span>

            <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;