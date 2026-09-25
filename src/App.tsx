import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading ECG Analyzer...
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
}

export default App;