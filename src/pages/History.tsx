import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileImage,
  HeartPulse,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import Card from "../components/common/Card";
import Disclaimer from "../components/common/Disclaimer";

import {
  deleteECGHistory,
  clearECGHistory,
  getECGHistory,
} from "../utils/historyStorage";

import {
  formatFileSize,
} from "../utils/formatters";

import type {
  ECGHistoryItem,
} from "../types/history";

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function formatDate(
  value: string
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
}

function formatConfidence(
  confidence: number
): string {
  const percentage =
    confidence <= 1
      ? confidence * 100
      : confidence;

  return `${percentage.toFixed(1)}%`;
}

function getConfidenceWidth(
  confidence: number
): string {
  const percentage =
    confidence <= 1
      ? confidence * 100
      : confidence;

  return `${Math.min(
    Math.max(
      percentage,
      0
    ),
    100
  )}%`;
}

/*
 * ============================================================
 * HISTORY CARD
 * ============================================================
 */

interface HistoryCardProps {
  item: ECGHistoryItem;
  onDelete: (
    id: string
  ) => void;
}

function HistoryCard({
  item,
  onDelete,
}: HistoryCardProps) {
  return (
    <Card padding="lg">
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <FileImage
              className="h-5 w-5 text-blue-600"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-slate-900">
              {item.fileName}
            </h2>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span>
                {formatFileSize(
                  item.fileSize
                )}
              </span>

              <span className="hidden sm:inline">
                •
              </span>

              <span className="inline-flex items-center gap-1">
                <CalendarDays
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />

                {formatDate(
                  item.createdAt
                )}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onDelete(item.id)
          }
          aria-label={`Delete ${item.fileName}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <Trash2
            className="h-4 w-4"
            aria-hidden="true"
          />

          Delete
        </button>
      </div>

      {/* ======================================================
          RESULT
          ====================================================== */}

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Analysis Result
            </p>

            <p className="mt-1 text-base font-bold text-slate-900">
              {item.prediction}
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />

            Complete
          </span>
        </div>

        {/* Confidence */}

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500">
              Confidence
            </span>

            <span className="font-semibold text-slate-700">
              {formatConfidence(
                item.confidence
              )}
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width:
                  getConfidenceWidth(
                    item.confidence
                  ),
              }}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          METRICS
          ====================================================== */}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="flex items-center gap-2">
            <HeartPulse
              className="h-4 w-4 text-red-500"
              aria-hidden="true"
            />

            <span className="text-xs text-slate-500">
              Heart Rate
            </span>
          </div>

          <p className="mt-2 font-semibold text-slate-900">
            {item.heartRate !== null
              ? `${item.heartRate} BPM`
              : "Not available"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-3">
          <div className="flex items-center gap-2">
            <Activity
              className="h-4 w-4 text-blue-600"
              aria-hidden="true"
            />

            <span className="text-xs text-slate-500">
              Rhythm
            </span>
          </div>

          <p className="mt-2 truncate font-semibold text-slate-900">
            {item.rhythm ??
              "Not available"}
          </p>
        </div>
      </div>

      {/* ======================================================
          FINDINGS
          ====================================================== */}

      {item.findings.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Findings
          </h3>

          <ul className="mt-3 space-y-2">
            {item.findings.map(
              (finding, index) => (
                <li
                  key={`${item.id}-finding-${index}`}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                    aria-hidden="true"
                  />

                  <span>
                    {finding}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </Card>
  );
}

/*
 * ============================================================
 * HISTORY PAGE
 * ============================================================
 */

function History() {
  const [
    history,
    setHistory,
  ] = useState<ECGHistoryItem[]>(
    () => getECGHistory()
  );

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  /*
   * ==========================================================
   * FILTER HISTORY
   * ==========================================================
   */

  const filteredHistory =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      if (!query) {
        return history;
      }

      return history.filter(
        (item) => {
          return (
            item.fileName
              .toLowerCase()
              .includes(query) ||
            item.prediction
              .toLowerCase()
              .includes(query) ||
            (
              item.rhythm ?? ""
            )
              .toLowerCase()
              .includes(query) ||
            item.findings.some(
              (finding) =>
                finding
                  .toLowerCase()
                  .includes(query)
            )
          );
        }
      );
    }, [
      history,
      searchQuery,
    ]);

  /*
   * ==========================================================
   * DELETE SINGLE ITEM
   * ==========================================================
   */

  const handleDelete = (
    id: string
  ) => {
    deleteECGHistory(id);

    setHistory(
      (currentHistory) =>
        currentHistory.filter(
          (item) =>
            item.id !== id
        )
    );
  };

  /*
   * ==========================================================
   * CLEAR ALL
   * ==========================================================
   */

  const handleClearHistory =
    () => {
      if (
        history.length === 0
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to clear all ECG analysis history?"
        );

      if (!confirmed) {
        return;
      }

      clearECGHistory();

      setHistory([]);
    };

  /*
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <div className="min-h-screen bg-[#f4f9fd]">
      <main className="mx-auto max-w-[1200px] px-5 py-8 lg:px-8">
        {/* ====================================================
            PAGE HEADER
            ==================================================== */}

        <section className="mb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-600">
                <Clock3
                  className="h-5 w-5"
                  aria-hidden="true"
                />

                <span className="text-sm font-semibold">
                  ECG History
                </span>
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Analysis History
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Review ECG analyses stored locally in this
                browser.
              </p>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={
                  handleClearHistory
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <Trash2
                  className="h-4 w-4"
                  aria-hidden="true"
                />

                Clear History
              </button>
            )}
          </div>
        </section>

        {/* ====================================================
            SEARCH
            ==================================================== */}

        {history.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder="Search ECG files, results, rhythm or findings..."
                aria-label="Search ECG history"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchQuery("")
                  }
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>

            <p className="mt-2 text-xs text-slate-400">
              {filteredHistory.length}{" "}
              {filteredHistory.length === 1
                ? "record"
                : "records"}{" "}
              found
            </p>
          </div>
        )}

        {/* ====================================================
            EMPTY HISTORY
            ==================================================== */}

        {history.length === 0 ? (
          <Card padding="lg">
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <Clock3
                  className="h-7 w-7 text-blue-600"
                  aria-hidden="true"
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                No ECG history yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Your completed ECG analyses will appear here
                after you analyze an ECG.
              </p>

              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FileImage
                  className="h-4 w-4"
                  aria-hidden="true"
                />

                Analyze an ECG
              </Link>
            </div>
          </Card>
        ) : filteredHistory.length === 0 ? (
          /* ==================================================
             NO SEARCH RESULTS
             ================================================== */

          <Card padding="lg">
            <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Search
                  className="h-6 w-6 text-slate-400"
                  aria-hidden="true"
                />
              </div>

              <h2 className="mt-4 font-semibold text-slate-900">
                No matching records
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try a different file name, result, rhythm,
                or finding.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSearchQuery("")
                }
                className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear search
              </button>
            </div>
          </Card>
        ) : (
          /* ==================================================
             HISTORY LIST
             ================================================== */

          <div className="space-y-5">
            {filteredHistory.map(
              (item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  onDelete={
                    handleDelete
                  }
                />
              )
            )}
          </div>
        )}

        {/* ====================================================
            DISCLAIMER
            ==================================================== */}

        <div className="mt-6">
          <Disclaimer>
            ECG analysis history is stored locally in this
            browser. AI-generated results are for informational
            purposes only and should be reviewed by a qualified
            healthcare professional.
          </Disclaimer>
        </div>
      </main>
    </div>
  );
}

export default History;