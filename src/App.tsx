import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const History = lazy(() => import("./pages/History"));
const About = lazy(() => import("./pages/About"));

function PageLoader() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-[#f7faff] px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-white shadow-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-700">
          Loading ECG Analyzer
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Preparing your workspace...
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;