import {
  Activity,
  FileText,
  History,
  Info,
  LayoutDashboard,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "About",
    path: "/about",
    icon: Info,
  },
];

function Sidebar({ open = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Activity size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-950">
                ECG Analyzer
              </p>
              <p className="text-[11px] text-slate-500">
                Analysis Platform
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Navigation
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                    ].join(" ")
                  }
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom information */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <FileText size={17} />
              <span className="text-sm font-semibold">
                Supported Files
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              Upload ECG reports in JPG, PNG, or PDF format.
            </p>

            <p className="mt-3 text-[11px] leading-4 text-slate-500">
              Maximum file size: 20 MB
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;