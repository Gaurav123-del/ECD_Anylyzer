import { Activity, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <Activity className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              ECG Analyzer
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              AI-Powered ECG Analysis
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="User profile"
          className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <UserCircle className="h-7 w-7" />
        </button>

      </div>
    </header>
  );
}

export default Header;