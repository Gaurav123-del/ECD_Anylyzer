import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

const Dashboard = lazy(
  () => import("./pages/Dashboard")
);

const History = lazy(
  () => import("./pages/History")
);

const About = lazy(
  () => import("./pages/About")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="text-sm text-slate-500">
              Loading ECG Analyzer...
            </div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;