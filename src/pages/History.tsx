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
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-[#f7faff] text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl min-w-0 px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section className="relative min-w-0 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50/70 px-4 py-5 shadow-sm sm:rounded-3xl sm:px-7 sm:py-8 lg:px-8 lg:py-9">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative flex min-w-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-2xl">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-700 sm:text-[10px]">
                <Clock3 size={12} />
                Analysis History
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:mt-5 sm:text-4xl">
                Your ECG
                <span className="text-blue-600"> analysis history</span>
              </h1>

              <p className="mt-3 max-w-xl text-xs leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
                Review previous ECG analysis results stored securely in this
                browser and quickly revisit important findings.
              </p>

              <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-semibold text-slate-500 shadow-sm sm:text-[10px]">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  Stored locally
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-semibold text-slate-500 shadow-sm sm:text-[10px]">
                  <Activity size={13} className="text-blue-500" />
                  {history.length}{" "}
                  {history.length === 1 ? "analysis" : "analyses"}
                </div>
              </div>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-600 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-fit"
              >
                <Trash2 size={15} />
                Clear All History
              </button>
            )}
          </div>
        </section>

        {history.length > 0 && (
          <section className="mt-5 sm:mt-7">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="relative w-full min-w-0 sm:max-w-xl">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 sm:left-4"
                />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by file, prediction, rhythm, or finding..."
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 sm:pl-11 sm:text-sm"
                  aria-label="Search ECG history"
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 sm:text-xs">
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

        {history.length === 0 && (
          <Card
            padding="none"
            className="mt-5 overflow-hidden border-slate-200/80 bg-white shadow-sm sm:mt-7"
          >
            <div className="relative flex min-w-0 flex-col items-center justify-center overflow-hidden px-4 py-14 text-center sm:px-5 sm:py-20">
              <div className="absolute -top-24 h-56 w-56 rounded-full bg-blue-100/50 blur-3xl" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm sm:h-16 sm:w-16">
                <Activity size={26} className="sm:h-[29px] sm:w-[29px]" />
              </div>

              <h2 className="relative mt-5 text-lg font-bold tracking-tight text-slate-950 sm:mt-6 sm:text-xl">
                No analysis history yet
              </h2>

              <p className="relative mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                ECG analyses you complete will appear here for quick review and
                comparison.
              </p>

              <a
                href="/"
                className="relative mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 sm:mt-7"
              >
                <Activity size={15} />
                Analyze an ECG
                <ArrowRight size={14} />
              </a>
            </div>
          </Card>
        )}

        {history.length > 0 && filteredHistory.length === 0 && (
          <Card
            padding="none"
            className="mt-5 overflow-hidden border-slate-200/80 bg-white shadow-sm sm:mt-7"
          >
            <div className="flex min-w-0 flex-col items-center justify-center px-4 py-12 text-center sm:px-5 sm:py-16">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 sm:h-14 sm:w-14">
                <Search size={23} />
              </div>

              <h2 className="mt-4 text-base font-bold text-slate-950 sm:mt-5 sm:text-lg">
                No matching results
              </h2>

              <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                Try a different file name, prediction, rhythm, or finding.
              </p>

              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-4 text-xs font-bold text-blue-600 transition hover:text-blue-700 sm:mt-5"
              >
                Clear search
              </button>
            </div>
          </Card>
        )}

        {filteredHistory.length > 0 && (
          <section className="mt-5 min-w-0 space-y-4 sm:mt-7 sm:space-y-5">
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
                  className="group min-w-0 overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                >
                  <article className="relative min-w-0 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-70 transition-opacity group-hover:opacity-100" />

                    <div className="min-w-0 p-4 sm:p-6">
                      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 sm:h-11 sm:w-11">
                            <FileText size={19} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h2
                              className="break-all text-sm font-bold text-slate-950 sm:truncate sm:text-[15px]"
                              title={item.fileName}
                            >
                              {item.fileName}
                            </h2>

                            <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400 sm:gap-x-4 sm:text-[11px]">
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays size={12} />
                                {formatDate(item.createdAt)}
                              </span>

                              <span>
                                {(item.fileSize / (1024 * 1024)).toFixed(2)} MB
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex min-h-9 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition-all hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-fit"
                          aria-label={`Delete ${item.fileName}`}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>

                      <div className="mt-5 grid min-w-0 gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                        <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 transition-colors group-hover:border-blue-100 sm:p-4">
                          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
                            <Activity size={13} />
                            Prediction
                          </div>

                          <p className="mt-2.5 break-words text-xs font-bold text-slate-900 sm:text-sm">
                            {item.prediction}
                          </p>
                        </div>

                        <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 transition-colors group-hover:border-blue-100 sm:p-4">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
                              <BrainCircuit size={13} />
                              Confidence
                            </div>

                            <span className="shrink-0 text-xs font-bold text-blue-600 sm:text-sm">
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

                        <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 transition-colors group-hover:border-blue-100 sm:p-4">
                          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
                            <HeartPulse size={13} />
                            Heart Rate
                          </div>

                          <p className="mt-2.5 text-xs font-bold text-slate-900 sm:text-sm">
                            {formatHeartRate(item.heartRate)}
                          </p>
                        </div>
                      </div>

                      {item.rhythm && (
                        <div className="mt-3 flex min-w-0 items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 sm:mt-4 sm:gap-3 sm:p-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                            <Waves size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-blue-700 sm:text-[10px]">
                              Rhythm
                            </p>

                            <p className="mt-1 break-words text-xs font-semibold text-slate-800 sm:text-sm">
                              {item.rhythm}
                            </p>
                          </div>
                        </div>
                      )}

                      {item.findings.length > 0 && (
                        <div className="mt-4 border-t border-slate-100 pt-4 sm:mt-5 sm:pt-5">
                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              size={15}
                              className="text-blue-600"
                            />

                            <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700 sm:text-xs">
                              Findings
                            </h3>
                          </div>

                          <ul className="mt-3 space-y-2">
                            {item.findings.map((finding, index) => (
                              <li
                                key={`${item.id}-finding-${index}`}
                                className="flex min-w-0 items-start gap-2.5 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                <span className="min-w-0 break-words">
                                  {finding}
                                </span>
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

        <div className="mt-6 sm:mt-8">
          <Disclaimer title="History & Privacy">
            <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="min-w-0 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
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