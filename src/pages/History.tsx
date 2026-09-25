import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HeartPulse,
  Search,
  ShieldCheck,
  Trash2,
  Waves,
} from "lucide-react";

import Header from "../components/layout/Header";
import Card from "../components/common/Card";
import Disclaimer from "../components/common/Disclaimer";

import type { ECGHistoryItem } from "../types/history";

import {
  clearHistory,
  deleteHistoryItem,
  getHistory,
} from "../utils/historyStorage";

import {
  formatConfidence,
  formatDate,
  formatHeartRate,
} from "../utils/formatters";

function History() {
  const [history, setHistory] = useState<ECGHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadHistory = useCallback(() => {
    setHistory(getHistory());
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const filteredHistory = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return history;
    }

    return history.filter((item) => {
      const searchableText = [
        item.fileName,
        item.prediction,
        item.rhythm ?? "",
        ...item.findings,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [history, searchTerm]);

  const handleDelete = useCallback((id: string) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  }, []);

  const handleClearAll = useCallback(() => {
    if (history.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all ECG analysis history?"
    );

    if (!confirmed) return;

    clearHistory();
    setHistory([]);
  }, [history.length]);

  return (
    <div className="min-h-screen bg-[#f7faff] text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Page Header */}
        <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50/70 px-5 py-7 shadow-sm sm:px-8 sm:py-9">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700">
                <Clock3 size={12} />
                Analysis History
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Your ECG
                <span className="text-blue-600"> analysis history</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Review previous ECG analysis results stored securely in this
                browser and quickly revisit important findings.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
                  <ShieldCheck
                    size={13}
                    className="text-emerald-500"
                  />
                  Stored locally
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
                  <Activity
                    size={13}
                    className="text-blue-500"
                  />
                  {history.length}{" "}
                  {history.length === 1 ? "analysis" : "analyses"}
                </div>
              </div>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-600 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <Trash2 size={15} />
                Clear All History
              </button>
            )}
          </div>
        </section>

        {/* Search + Summary */}
        {history.length > 0 && (
          <section className="mt-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xl">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search by file, prediction, rhythm, or finding..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  aria-label="Search ECG history"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Activity size={14} />

                <span>
                  Showing{" "}
                  <span className="font-bold text-slate-700">
                    {filteredHistory.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-700">
                    {history.length}
                  </span>
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {history.length === 0 && (
          <Card
            padding="none"
            className="mt-7 overflow-hidden border-slate-200/80 bg-white shadow-sm"
          >
            <div className="relative flex flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
              <div className="absolute -top-24 h-56 w-56 rounded-full bg-blue-100/50 blur-3xl" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm">
                <Activity size={29} />
              </div>

              <h2 className="relative mt-6 text-xl font-bold tracking-tight text-slate-950">
                No analysis history yet
              </h2>

              <p className="relative mt-2 max-w-md text-sm leading-6 text-slate-500">
                ECG analyses you complete will appear here for quick review
                and comparison.
              </p>

              <a
                href="/"
                className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25"
              >
                <Activity size={15} />
                Analyze an ECG
                <ArrowRight size={14} />
              </a>
            </div>
          </Card>
        )}

        {/* No Search Results */}
        {history.length > 0 && filteredHistory.length === 0 && (
          <Card
            padding="none"
            className="mt-7 overflow-hidden border-slate-200/80 bg-white shadow-sm"
          >
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Search size={25} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-950">
                No matching results
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try a different file name, prediction, rhythm, or finding.
              </p>

              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-5 text-xs font-bold text-blue-600 transition hover:text-blue-700"
              >
                Clear search
              </button>
            </div>
          </Card>
        )}

        {/* History List */}
        {filteredHistory.length > 0 && (
          <section className="mt-7 space-y-5">
            {filteredHistory.map((item) => {
              const confidence =
                item.confidence <= 1
                  ? item.confidence * 100
                  : item.confidence;

              const normalizedConfidence = Math.min(
                Math.max(confidence, 0),
                100
              );

              return (
                <Card
                  key={item.id}
                  padding="none"
                  className="group overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                >
                  <article className="relative overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-70 transition-opacity group-hover:opacity-100" />

                    <div className="p-5 sm:p-6">
                      {/* File Header */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                            <FileText size={20} />
                          </div>

                          <div className="min-w-0">
                            <h2 className="truncate text-sm font-bold text-slate-950 sm:text-[15px]">
                              {item.fileName}
                            </h2>

                            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays size={12} />
                                {formatDate(item.createdAt)}
                              </span>

                              <span>
                                {(item.fileSize / (1024 * 1024)).toFixed(2)}{" "}
                                MB
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition-all hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          aria-label={`Delete ${item.fileName}`}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>

                      {/* Metrics */}
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {/* Prediction */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition-colors group-hover:border-blue-100">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                            <Activity size={13} />
                            Prediction
                          </div>

                          <p className="mt-2.5 text-sm font-bold text-slate-900">
                            {item.prediction}
                          </p>
                        </div>

                        {/* Confidence */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition-colors group-hover:border-blue-100">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                              <BrainCircuit size={13} />
                              Confidence
                            </div>

                            <span className="text-sm font-bold text-blue-600">
                              {formatConfidence(item.confidence)}
                            </span>
                          </div>

                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                              style={{
                                width: `${normalizedConfidence}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Heart Rate */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition-colors group-hover:border-blue-100">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                            <HeartPulse size={13} />
                            Heart Rate
                          </div>

                          <p className="mt-2.5 text-sm font-bold text-slate-900">
                            {formatHeartRate(item.heartRate)}
                          </p>
                        </div>
                      </div>

                      {/* Rhythm */}
                      {item.rhythm && (
                        <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                            <Waves size={16} />
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">
                              Rhythm
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-800">
                              {item.rhythm}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Findings */}
                      {item.findings.length > 0 && (
                        <div className="mt-5 border-t border-slate-100 pt-5">
                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              size={15}
                              className="text-blue-600"
                            />

                            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700">
                              Findings
                            </h3>
                          </div>

                          <ul className="mt-3 space-y-2">
                            {item.findings.map((finding, index) => (
                              <li
                                key={`${item.id}-finding-${index}`}
                                className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />

                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </article>
                </Card>
              );
            })}
          </section>
        )}

        {/* Privacy / Disclaimer */}
        <div className="mt-8">
          <Disclaimer title="History & Privacy">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-sm leading-6 text-slate-600">
                Analysis history is stored locally in your browser. Clearing
                browser storage or site data may remove these records. ECG
                analysis results are informational and should not replace
                professional medical evaluation.
              </p>
            </div>
          </Disclaimer>
        </div>
      </main>
    </div>
  );
}

export default History;