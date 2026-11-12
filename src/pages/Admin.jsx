import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  adminLogin,
  adminMe,
  listApplications,
  updateApplication,
  deleteApplication,
  listMessages,
  updateMessage,
  deleteMessage,
  listGuideLeads,
  deleteGuideLead,
  markGuideLeadsSeen,
  adminSummary,
  exportCsv,
  setToken,
  getToken,
  clearToken,
} from "@/lib/api";
import { cn } from "@/lib/utils";
import { Rule } from "@/components/field/devices";

const STATUS_META = {
  new: { label: "New", dot: "bg-nexus" },
  reviewing: { label: "Reviewing", dot: "bg-ink/40" },
  shortlisted: { label: "Shortlisted", dot: "bg-growth" },
  contacted: { label: "Contacted", dot: "bg-navy" },
  selected: { label: "Selected", dot: "bg-growth" },
  rejected: { label: "Rejected", dot: "bg-leak" },
};
const STATUS_ORDER = ["new", "reviewing", "shortlisted", "contacted", "selected", "rejected"];

const TABS = [
  { key: "applications", label: "Applications" },
  { key: "enquiries", label: "Enquiries" },
  { key: "leads", label: "Guide Leads" },
];

const GROUPS = [
  {
    letter: "A",
    title: "Details",
    fields: [
      ["name", "Name"],
      ["company", "Company"],
      ["role", "Role"],
      ["email", "Email"],
      ["linkedin", "LinkedIn"],
      ["website", "Website"],
    ],
  },
  {
    letter: "B",
    title: "Business",
    fields: [
      ["what_you_sell", "What do you sell?"],
      ["ideal_customer", "Ideal customer"],
      ["primary_offer", "Primary offer"],
      ["website_contribution", "Website contribution"],
    ],
  },
  {
    letter: "C",
    title: "Website",
    fields: [
      ["whats_wrong", "What's wrong"],
      ["investigate_most", "Investigate most"],
      ["primary_conversion", "Primary conversion"],
    ],
  },
  {
    letter: "D",
    title: "Economics",
    fields: [
      ["avg_customer_value", "Avg. customer value"],
      ["monthly_leads", "Monthly leads"],
      ["website_customers", "Website customers"],
      ["additional_context", "Additional context"],
    ],
  },
];

const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* ------------------------------------------------------------------ login */
function Login({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const go = async (e) => {
    e?.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await adminLogin(password);
      setToken(res.token);
      onSuccess();
    } catch (e2) {
      setErr(e2?.response?.data?.detail || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[440px]">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="label">TSM Nexus &middot; Back office</div>
        </div>
        <h1 className="font-display font-semibold text-3xl sm:text-4xl leading-tight text-ink">
          Audit applications
        </h1>
        <Rule className="my-7" />
        <form onSubmit={go} className="evidence-frame reg-marks rounded-[6px] overflow-hidden">
          <div className="perf-top" aria-hidden="true" />
          <div className="p-6">
            <label htmlFor="admin-password" className="block">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/60">
                Access password
              </span>
            </label>
            <input
              id="admin-password"
              data-testid="admin-password-input"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full bg-paper border border-ink/25 rounded-[3px] px-3.5 py-2.5 font-mono text-sm text-ink focus:outline-none focus:border-nexus focus:ring-2 focus:ring-nexus/25"
              placeholder="••••••••"
            />
            {err && (
              <div
                data-testid="admin-login-error"
                className="mt-3 font-mono text-[10px] tracking-[0.12em] uppercase text-leak"
              >
                {err}
              </div>
            )}
            <button
              type="submit"
              data-testid="admin-login-submit"
              disabled={busy || !password}
              className="mt-6 w-full inline-flex items-center justify-center gap-3 bg-ink text-paper px-5 py-3 rounded-[3px] font-mono text-[10.5px] font-semibold tracking-[0.2em] uppercase hover:bg-nexus hover:text-white transition-colors disabled:opacity-50"
            >
              {busy ? "Checking…" : "Enter"}
            </button>
          </div>
        </form>
        <Link
          to="/"
          className="mt-6 inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-ink/45 hover:text-nexus transition-colors"
        >
          &#8592; Back to the field guide
        </Link>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ detail */
function Detail({ app, onClose, onChange }) {
  const [notes, setNotes] = useState(app.admin_notes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => setNotes(app.admin_notes || ""), [app.id, app.admin_notes]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const saveNotes = async () => {
    setSavingNotes(true);
    try {
      const updated = await updateApplication(app.id, { admin_notes: notes });
      onChange(updated);
      toast.success("Notes saved");
    } catch (e) {
      toast.error("Could not save notes");
    } finally {
      setSavingNotes(false);
    }
  };

  const setStatus = async (status) => {
    try {
      const updated = await updateApplication(app.id, { status });
      onChange(updated);
      toast.success(`Marked ${STATUS_META[status].label.toLowerCase()}`);
    } catch (e) {
      toast.error("Could not update status");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Application detail">
      <button
        aria-label="Close detail"
        onClick={onClose}
        className="flex-1 bg-ink/40 backdrop-blur-[1px]"
      />
      <aside
        data-testid="admin-application-detail"
        className="w-full max-w-[720px] h-full overflow-y-auto bg-paper border-l border-ink/25 shadow-[var(--shadow-float)]"
      >
        <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b border-ink/20 px-5 sm:px-7 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="label">Ref {app.id.slice(0, 8).toUpperCase()}</div>
            <h2 className="mt-1.5 font-display font-semibold text-2xl leading-tight text-ink">{app.company}</h2>
            <div className="mt-1 font-mono text-[11px] text-ink/50">
              {app.name} &middot; {app.role}
            </div>
          </div>
          <button
            onClick={onClose}
            data-testid="admin-detail-close"
            className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/50 hover:text-leak transition-colors shrink-0"
          >
            Close &#215;
          </button>
        </div>

        <div className="px-5 sm:px-7 py-6">
          <div className="flex flex-wrap gap-1.5">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                data-testid={`admin-status-${s}`}
                onClick={() => setStatus(s)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-t-[4px] border border-b-0 px-2.5 py-1.5 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase transition-colors",
                  app.status === s
                    ? "border-nexus bg-nexus/[0.1] text-nexus"
                    : "border-ink/20 text-ink/55 hover:border-ink/40 hover:text-ink"
                )}
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_META[s].dot)} />
                {STATUS_META[s].label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              ["Submitted", fmtDate(app.submitted_at)],
              ["Website", app.website],
              ["Email", app.email],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[4px] border border-ink/[0.16] bg-paper-sheet p-3">
                <div className="label">{k}</div>
                <div className="mt-1.5 font-mono text-[11px] text-ink/75 break-words">
                  {k === "Website" || k === "Email" ? (
                    <a
                      href={k === "Email" ? `mailto:${v}` : v}
                      target={k === "Website" ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-nexus hover:underline"
                    >
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </div>
              </div>
            ))}
          </div>

          {GROUPS.map((g) => (
            <div key={g.letter} className="mt-7">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-nexus mb-3">
                {g.letter} &middot; {g.title}
              </div>
              <dl className="evidence-frame rounded-[4px] divide-y divide-ink/[0.09]">
                {g.fields.map(([k, label]) => (
                  <div key={k} className="grid sm:grid-cols-[210px,1fr] gap-1 sm:gap-4 p-3.5">
                    <dt className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink/45">
                      {label}
                    </dt>
                    <dd
                      data-testid={`detail-${k}`}
                      className="text-[15px] leading-relaxed text-ink/80 whitespace-pre-wrap break-words"
                    >
                      {app[k] || <span className="text-ink/30">&mdash;</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="mt-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-nexus mb-3">
              Commitments
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                ["agree_honest", "Honest"],
                ["agree_context", "Context"],
                ["agree_findings", "Open to findings"],
              ].map(([k, l]) => (
                <span
                  key={k}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-[3px] border px-2.5 py-1.5 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase",
                    app[k] ? "border-growth/50 text-growth" : "border-ink/20 text-ink/40"
                  )}
                >
                  {app[k] ? "\u2713" : "\u2715"} {l}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <label htmlFor="admin-notes" className="label block mb-2">
              Internal notes
            </label>
            <textarea
              id="admin-notes"
              data-testid="admin-notes-input"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observations, first-pass leak hypotheses, cohort fit…"
              className="w-full bg-paper-sheet border border-ink/25 rounded-[3px] px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/35 focus:outline-none focus:border-nexus focus:ring-2 focus:ring-nexus/25"
            />
            <button
              onClick={saveNotes}
              data-testid="admin-save-notes"
              disabled={savingNotes}
              className="mt-3 inline-flex items-center gap-2 border border-ink/25 px-4 py-2 rounded-[3px] font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase text-ink/70 hover:border-nexus hover:text-nexus transition-colors disabled:opacity-50"
            >
              {savingNotes ? "Saving…" : "Save notes"}
            </button>
          </div>

          {app.email_status && Object.keys(app.email_status).length > 0 && (
            <div className="mt-7 rounded-[4px] border border-ink/[0.16] bg-paper-sheet p-3.5">
              <div className="label mb-2">Email delivery</div>
              <div className="font-mono text-[10px] text-ink/60 space-y-1">
                <div>admin: {String(app.email_status.admin)}</div>
                <div>applicant: {String(app.email_status.applicant)}</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

/* --------------------------------------------------------- enquiry detail */
function EnquiryDetail({ msg, onClose, onToggleHandled }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const meta = [
    ["Received", fmtDate(msg.created_at)],
    ["Name", msg.name],
    ["Email", msg.email],
    ["Company", msg.company || "—"],
    ["Website", msg.website || "—"],
  ];

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Enquiry detail">
      <button aria-label="Close detail" onClick={onClose} className="flex-1 bg-ink/40 backdrop-blur-[1px]" />
      <aside
        data-testid="admin-enquiry-detail"
        className="w-full max-w-[640px] h-full overflow-y-auto bg-paper border-l border-ink/25 shadow-[var(--shadow-float)]"
      >
        <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b border-ink/20 px-5 sm:px-7 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="label">Ref {msg.id.slice(0, 8).toUpperCase()}</div>
            <h2 className="mt-1.5 font-display font-semibold text-2xl leading-tight text-ink break-words">
              {msg.subject}
            </h2>
          </div>
          <button
            onClick={onClose}
            data-testid="admin-enquiry-close"
            className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/50 hover:text-leak transition-colors shrink-0"
          >
            Close &#215;
          </button>
        </div>
        <div className="px-5 sm:px-7 py-6">
          <button
            data-testid="admin-enquiry-handled-toggle"
            onClick={() => onToggleHandled(msg)}
            aria-pressed={!!msg.handled}
            className={cn(
              "inline-flex items-center gap-2 rounded-[3px] border px-3 py-2 font-mono text-[9.5px] font-semibold tracking-[0.16em] uppercase transition-colors",
              msg.handled
                ? "border-growth/50 bg-growth/[0.1] text-growth"
                : "border-ink/25 text-ink/55 hover:border-nexus hover:text-nexus"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", msg.handled ? "bg-growth" : "bg-ink/30")} />
            {msg.handled ? "Handled" : "Mark handled"}
          </button>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {meta.map(([k, v]) => (
              <div key={k} className="rounded-[4px] border border-ink/[0.16] bg-paper-sheet p-3">
                <div className="label">{k}</div>
                <div className="mt-1.5 font-mono text-[11px] text-ink/75 break-words">
                  {k === "Email" ? (
                    <a href={`mailto:${v}`} className="text-nexus hover:underline">{v}</a>
                  ) : k === "Website" && v !== "—" ? (
                    <a href={v} target="_blank" rel="noreferrer" className="text-nexus hover:underline">{v}</a>
                  ) : (
                    v
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-nexus mb-3">Message</div>
            <div
              data-testid="admin-enquiry-message"
              className="evidence-frame rounded-[4px] p-4 text-[15px] leading-relaxed text-ink/80 whitespace-pre-wrap break-words"
            >
              {msg.message}
            </div>
          </div>
          <a
            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
            data-testid="admin-enquiry-reply"
            className="mt-6 inline-flex items-center gap-2 bg-ink text-paper px-4 py-2.5 rounded-[3px] font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase hover:bg-nexus hover:text-white transition-colors"
          >
            Reply by email &#8594;
          </a>
        </div>
      </aside>
    </div>
  );
}

/* -------------------------------------------------------- shared bits */
function EmptyRow({ colSpan, title, sub }) {
  return (
    <tr>
      <td colSpan={colSpan} data-testid="admin-empty-state" className="px-4 py-14 text-center">
        <div className="font-display font-semibold text-xl text-ink/70">{title}</div>
        <div className="mt-2 font-mono text-[10px] tracking-[0.16em] uppercase text-ink/40">{sub}</div>
      </td>
    </tr>
  );
}

function LoadingRow({ colSpan }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center font-mono text-[11px] tracking-[0.16em] uppercase text-ink/40">
        Loading…
      </td>
    </tr>
  );
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      data-testid="admin-search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full sm:w-[300px] bg-paper-sheet border border-ink/25 rounded-[3px] px-3.5 py-2 font-mono text-[10.5px] text-ink placeholder:text-ink/40 focus:outline-none focus:border-nexus focus:ring-2 focus:ring-nexus/25"
    />
  );
}

/* ---------------------------------------------------- applications view */
function ApplicationsView({ onMutate }) {
  const [rows, setRows] = useState([]);
  const [counts, setCounts] = useState({});
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listApplications({ status: filter, q: q || undefined });
      setRows(res.applications);
      setCounts(res.counts);
    } catch (e) {
      if (e?.response?.status !== 401) toast.error("Could not load applications");
    } finally {
      setLoading(false);
    }
  }, [filter, q]);

  useEffect(() => {
    const t = setTimeout(load, q ? 350 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  const onChanged = (updated) => {
    setRows((r) => r.map((x) => (x.id === updated.id ? updated : x)));
    load();
    onMutate?.();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this application permanently?")) return;
    try {
      await deleteApplication(id);
      setOpenId(null);
      toast.success("Application deleted");
      load();
      onMutate?.();
    } catch (e) {
      toast.error("Could not delete");
    }
  };

  const open = useMemo(() => rows.find((r) => r.id === openId) || null, [rows, openId]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-1.5">
          {["all", ...STATUS_ORDER].map((s) => (
            <button
              key={s}
              data-testid={`admin-filter-${s}`}
              onClick={() => setFilter(s)}
              className={cn(
                "inline-flex items-center gap-2 rounded-[3px] border px-2.5 py-1.5 font-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase transition-colors",
                filter === s
                  ? "border-nexus bg-nexus/[0.09] text-nexus"
                  : "border-ink/20 text-ink/55 hover:border-ink/40 hover:text-ink"
              )}
            >
              {s === "all" ? "All" : STATUS_META[s].label}
              <span className="text-ink/35">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        <SearchInput value={q} onChange={setQ} placeholder="Search company, name, email, website…" />
      </div>

      <div className="mt-6 sheet rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table data-testid="admin-applications-table" className="w-full min-w-[860px]">
            <thead>
              <tr className="border-b-2 border-ink/25 bg-ink/[0.03]">
                {["Submitted", "Company", "Contact", "Website", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-mono text-[9.5px] font-semibold tracking-[0.2em] uppercase text-ink/55">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && rows.length === 0 && <LoadingRow colSpan={6} />}
              {!loading && rows.length === 0 && (
                <EmptyRow colSpan={6} title="No applications yet." sub="Submissions from the field guide appear here" />
              )}
              {rows.map((r) => (
                <tr
                  key={r.id}
                  data-testid={`admin-applications-row-${r.id}`}
                  onClick={() => setOpenId(r.id)}
                  className="border-b border-ink/[0.09] hover:bg-nexus/[0.06] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3.5 font-mono text-[11px] text-ink/55 whitespace-nowrap">
                    {fmtDate(r.submitted_at)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-display font-semibold text-base text-ink">{r.company}</div>
                    <div className="font-mono text-[10px] text-ink/40 mt-0.5">
                      Ref {r.id.slice(0, 8).toUpperCase()}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-[14px] text-ink/80">{r.name}</div>
                    <div className="font-mono text-[10px] text-ink/45 mt-0.5">{r.email}</div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-nexus max-w-[200px] truncate">
                    {r.website}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-2 rounded-[3px] border border-ink/20 px-2 py-1 font-mono text-[9.5px] tracking-[0.12em] uppercase text-ink/65">
                      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_META[r.status]?.dot || "bg-ink/30")} />
                      {STATUS_META[r.status]?.label || r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <button
                      data-testid={`admin-delete-${r.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(r.id);
                      }}
                      className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/35 hover:text-leak transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && <Detail app={open} onClose={() => setOpenId(null)} onChange={onChanged} />}
    </>
  );
}

/* ------------------------------------------------------- enquiries view */
function EnquiriesView({ onMutate }) {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listMessages({ q: q || undefined });
      setRows(res.messages);
    } catch (e) {
      if (e?.response?.status !== 401) toast.error("Could not load enquiries");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    const t = setTimeout(load, q ? 350 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  const toggleHandled = async (msg) => {
    const next = !msg.handled;
    // optimistic update so the detail + row reflect immediately
    setRows((r) => r.map((x) => (x.id === msg.id ? { ...x, handled: next } : x)));
    try {
      await updateMessage(msg.id, { handled: next });
      toast.success(next ? "Marked handled" : "Marked unhandled");
      onMutate?.();
    } catch (e) {
      setRows((r) => r.map((x) => (x.id === msg.id ? { ...x, handled: msg.handled } : x)));
      toast.error("Could not update");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    try {
      await deleteMessage(id);
      setOpenId(null);
      toast.success("Enquiry deleted");
      load();
      onMutate?.();
    } catch (e) {
      toast.error("Could not delete");
    }
  };

  const open = useMemo(() => rows.find((r) => r.id === openId) || null, [rows, openId]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 justify-end">
        <SearchInput value={q} onChange={setQ} placeholder="Search name, email, subject, message…" />
      </div>

      <div className="mt-6 sheet rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table data-testid="admin-enquiries-table" className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b-2 border-ink/25 bg-ink/[0.03]">
                {["Received", "From", "Subject", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-mono text-[9.5px] font-semibold tracking-[0.2em] uppercase text-ink/55">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && rows.length === 0 && <LoadingRow colSpan={5} />}
              {!loading && rows.length === 0 && (
                <EmptyRow colSpan={5} title="No enquiries yet." sub="Messages from the contact page appear here" />
              )}
              {rows.map((r) => (
                <tr
                  key={r.id}
                  data-testid={`admin-enquiries-row-${r.id}`}
                  onClick={() => setOpenId(r.id)}
                  className={cn(
                    "border-b border-ink/[0.09] hover:bg-nexus/[0.06] cursor-pointer transition-colors",
                    r.handled && "opacity-60"
                  )}
                >
                  <td className="px-4 py-3.5 font-mono text-[11px] text-ink/55 whitespace-nowrap">
                    {fmtDate(r.created_at)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-[14px] text-ink/80">{r.name}</div>
                    <div className="font-mono text-[10px] text-ink/45 mt-0.5">{r.email}</div>
                  </td>
                  <td className="px-4 py-3.5 max-w-[300px]">
                    <div className="font-display font-semibold text-[15px] text-ink truncate">{r.subject}</div>
                    <div className="text-[12px] text-ink/50 truncate">{r.message}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      data-testid={`admin-enquiry-toggle-${r.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleHandled(r);
                      }}
                      aria-pressed={!!r.handled}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-[3px] border px-2.5 py-1.5 font-mono text-[9px] font-semibold tracking-[0.12em] uppercase transition-colors",
                        r.handled
                          ? "border-growth/50 bg-growth/[0.1] text-growth"
                          : "border-nexus/40 bg-nexus/[0.06] text-nexus hover:bg-nexus/[0.12]"
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", r.handled ? "bg-growth" : "bg-nexus")} />
                      {r.handled ? "Handled" : "New"}
                    </button>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <button
                      data-testid={`admin-enquiry-delete-${r.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(r.id);
                      }}
                      className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/35 hover:text-leak transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && <EnquiryDetail msg={open} onClose={() => setOpenId(null)} onToggleHandled={toggleHandled} />}
    </>
  );
}

/* ------------------------------------------------------ guide leads view */
function LeadsView({ onMutate }) {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listGuideLeads({ q: q || undefined });
      setRows(res.leads);
    } catch (e) {
      if (e?.response?.status !== 401) toast.error("Could not load guide leads");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    const t = setTimeout(load, q ? 350 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  // opening this tab clears the "new leads" badge
  useEffect(() => {
    let active = true;
    markGuideLeadsSeen()
      .then(() => {
        if (active) onMutate?.();
      })
      .catch(() => {});
    return () => {
      active = false;
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this lead permanently?")) return;
    try {
      await deleteGuideLead(id);
      toast.success("Lead deleted");
      load();
      onMutate?.();
    } catch (e) {
      toast.error("Could not delete");
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 justify-end">
        <SearchInput value={q} onChange={setQ} placeholder="Search name or email…" />
      </div>

      <div className="mt-6 sheet rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table data-testid="admin-leads-table" className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-ink/25 bg-ink/[0.03]">
                {["Downloaded", "Name", "Email", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-mono text-[9.5px] font-semibold tracking-[0.2em] uppercase text-ink/55">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && rows.length === 0 && <LoadingRow colSpan={4} />}
              {!loading && rows.length === 0 && (
                <EmptyRow colSpan={4} title="No guide leads yet." sub="Email captures from the PDF download appear here" />
              )}
              {rows.map((r) => (
                <tr
                  key={r.id}
                  data-testid={`admin-leads-row-${r.id}`}
                  className="border-b border-ink/[0.09] hover:bg-nexus/[0.06] transition-colors"
                >
                  <td className="px-4 py-3.5 font-mono text-[11px] text-ink/55 whitespace-nowrap">
                    {fmtDate(r.created_at)}
                  </td>
                  <td className="px-4 py-3.5 text-[14px] text-ink/80">{r.name || "—"}</td>
                  <td className="px-4 py-3.5">
                    <a href={`mailto:${r.email}`} className="font-mono text-[12px] text-nexus hover:underline">
                      {r.email}
                    </a>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <button
                      data-testid={`admin-lead-delete-${r.id}`}
                      onClick={() => remove(r.id)}
                      className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/35 hover:text-leak transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ page */
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [meta, setMeta] = useState(null);
  const [tab, setTab] = useState("applications");
  const [summary, setSummary] = useState({});

  const bootstrap = useCallback(async () => {
    if (!getToken()) {
      setChecking(false);
      return;
    }
    try {
      const m = await adminMe();
      setMeta(m);
      setAuthed(true);
    } catch (e) {
      clearToken();
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const refreshSummary = useCallback(async () => {
    try {
      setSummary(await adminSummary());
    } catch (e) {
      /* silent — badges are non-critical */
    }
  }, []);

  useEffect(() => {
    if (authed) refreshSummary();
  }, [authed, refreshSummary]);

  const BADGE = {
    applications: summary.applications_new || 0,
    enquiries: summary.enquiries_unhandled || 0,
    leads: summary.leads_new || 0,
  };

  const exportCurrent = async () => {
    const map = {
      applications: ["/admin/export.csv", "tsm-nexus-applications"],
      enquiries: ["/admin/messages.csv", "tsm-nexus-enquiries"],
      leads: ["/admin/guide-leads.csv", "tsm-nexus-guide-leads"],
    };
    const [path, prefix] = map[tab];
    try {
      await exportCsv(path, prefix);
      toast.success("CSV exported");
    } catch (e) {
      toast.error("Export failed");
    }
  };

  const HEADINGS = {
    applications: { label: "Founding cohort · applications" },
    enquiries: { label: "General · enquiries" },
    leads: { label: "Field guide · PDF leads" },
  };

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/40">
          Loading…
        </div>
      </main>
    );
  }

  if (!authed) return <Login onSuccess={bootstrap} />;

  return (
    <main className="min-h-screen">
      <div className="sticky top-0 z-30 border-b border-ink/[0.16] bg-paper/95 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-4">
            <Link
              to="/"
              className="font-mono text-[9.5px] font-semibold tracking-[0.26em] uppercase text-ink/75 hover:text-nexus transition-colors"
            >
              TSM NEXUS
            </Link>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/40">
              Back office
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid="admin-export-csv-button"
              onClick={exportCurrent}
              className="inline-flex items-center gap-2 border border-ink/25 px-3.5 py-2 rounded-[3px] font-mono text-[9.5px] font-semibold tracking-[0.16em] uppercase text-ink/70 hover:border-nexus hover:text-nexus transition-colors"
            >
              Export CSV
            </button>
            <button
              data-testid="admin-logout-button"
              onClick={() => {
                clearToken();
                setAuthed(false);
              }}
              className="inline-flex items-center gap-2 border border-ink/25 px-3.5 py-2 rounded-[3px] font-mono text-[9.5px] font-semibold tracking-[0.16em] uppercase text-ink/55 hover:border-leak hover:text-leak transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 py-8 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="label mb-2">{HEADINGS[tab].label}</div>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl leading-tight text-ink">
              Submissions
            </h1>
          </div>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/45 leading-relaxed text-right">
            Notify: {meta?.notify_email}
            <br />
            <span className={meta?.email_configured ? "text-growth" : "text-leak"}>
              Email {meta?.email_configured ? "live" : "not configured"}
            </span>
          </div>
        </div>

        <Rule className="my-7" />

        {/* tab bar */}
        <div className="flex flex-wrap gap-1.5 mb-7" role="tablist" aria-label="Submission types">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              data-testid={`admin-tab-${t.key}`}
              onClick={() => setTab(t.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-[3px] border px-3.5 py-2 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors",
                tab === t.key
                  ? "border-nexus bg-nexus/[0.09] text-nexus"
                  : "border-ink/20 text-ink/55 hover:border-ink/40 hover:text-ink"
              )}
            >
              {t.label}
              {BADGE[t.key] > 0 && (
                <span
                  data-testid={`admin-tab-badge-${t.key}`}
                  className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-nexus text-white font-mono text-[9px] font-bold leading-none"
                >
                  {BADGE[t.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "applications" && <ApplicationsView onMutate={refreshSummary} />}
        {tab === "enquiries" && <EnquiriesView onMutate={refreshSummary} />}
        {tab === "leads" && <LeadsView onMutate={refreshSummary} />}
      </div>
    </main>
  );
}
