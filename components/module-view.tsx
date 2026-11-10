"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  Check,
  ChevronDown,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import { RoleSettings } from "@/components/role-settings";

type RecordRow = {
  name: string;
  subtitle: string;
  department: string;
  status: string;
  date: string;
  initials: string;
  tone: string;
};

const seedRows: RecordRow[] = [
  { name: "Sofia Kim", subtitle: "EMP-1048 · Product Designer", department: "Product", status: "Active", date: "Nov 04, 2026", initials: "SK", tone: "avatar-orange" },
  { name: "Jordan Miller", subtitle: "EMP-1047 · Senior Engineer", department: "Engineering", status: "Active", date: "Nov 03, 2026", initials: "JM", tone: "avatar-blue" },
  { name: "Ava Thompson", subtitle: "EMP-1046 · People Partner", department: "People", status: "On leave", date: "Nov 01, 2026", initials: "AT", tone: "avatar-pink" },
  { name: "Liam Chen", subtitle: "EMP-1045 · Finance Analyst", department: "Finance", status: "Active", date: "Oct 28, 2026", initials: "LC", tone: "avatar-green" },
  { name: "Daniel Wright", subtitle: "EMP-1044 · Marketing Lead", department: "Marketing", status: "Active", date: "Oct 25, 2026", initials: "DW", tone: "avatar-purple" },
  { name: "Priya Sharma", subtitle: "EMP-1043 · Product Designer", department: "Product", status: "Pending", date: "Oct 23, 2026", initials: "PS", tone: "avatar-orange" },
];

const titles: Record<string, { title: string; description: string; button: string; noun: string }> = {
  people: { title: "People", description: "Manage your team and employee information.", button: "Add employee", noun: "employee" },
  attendance: { title: "Time & attendance", description: "Keep track of schedules, hours, and attendance.", button: "Add record", noun: "record" },
  "time-off": { title: "Time off", description: "Review requests and keep leave plans in sync.", button: "New request", noun: "request" },
  payroll: { title: "Payroll", description: "Manage pay runs, compensation, and deductions.", button: "Start payroll", noun: "payroll" },
  hiring: { title: "Hiring", description: "Manage open roles and move candidates forward.", button: "Create opening", noun: "opening" },
  performance: { title: "Performance", description: "Support growth with clear goals and feedback.", button: "Create review", noun: "review" },
  learning: { title: "Learning", description: "Build skills and grow your people together.", button: "Add course", noun: "course" },
  reports: { title: "Reports", description: "Explore insights across your workforce.", button: "Create report", noun: "report" },
  settings: { title: "Role settings", description: "Control what each role can access across your workspace.", button: "Add role", noun: "role" },
};

function titleCase(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ModuleView({ module }: { module: string }) {
  const config = titles[module] ?? {
    title: titleCase(module),
    description: `View and manage your ${titleCase(module).toLowerCase()} workspace.`,
    button: "Add new",
    noun: "item",
  };
  const [rows, setRows] = useState(seedRows);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All statuses");
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [notice, setNotice] = useState("");
  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const matchesQuery = `${row.name} ${row.subtitle} ${row.department}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesFilter = filter === "All statuses" || row.status === filter;
        return matchesQuery && matchesFilter;
      }),
    [filter, query, rows],
  );

  if (module === "settings") {
    return <RoleSettings />;
  }

  function addRecord(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setRows((current) => [
      {
        name,
        subtitle: "EMP-1049 · New team member",
        department: "Unassigned",
        status: "Pending",
        date: "Today",
        initials: name
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? "")
          .join(""),
        tone: "avatar-purple",
      },
      ...current,
    ]);
    setNewName("");
    setModalOpen(false);
    setNotice(`${name} added to your workspace.`);
    window.setTimeout(() => setNotice(""), 3000);
  }

  return (
    <div className="module-page">
      {notice && <div className="toast-message"><Check size={16} />{notice}</div>}
      <div className="module-heading">
        <div>
          <div className="eyebrow">PEOPLE OPERATIONS</div>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
        <button className="primary-button" onClick={() => setModalOpen(true)}><Plus size={17} />{config.button}</button>
      </div>

      <section className="module-stat-grid">
        <article className="module-stat"><span>Total {config.title.toLowerCase()}</span><strong>{module === "people" ? "248" : "36"}</strong><small><span className="trend-up">↑ 8.2%</span> vs. last month</small></article>
        <article className="module-stat"><span>Active</span><strong>221</strong><small>Across 8 departments</small></article>
        <article className="module-stat"><span>Needs attention</span><strong className="attention-number">12</strong><small>Review recommended</small></article>
        <article className="module-stat"><span>Updated this week</span><strong>18</strong><small>Latest changes</small></article>
      </section>

      <section className="panel directory-panel">
        <div className="directory-heading">
          <div><h2>{module === "people" ? "Employee directory" : `${config.title} overview`}</h2><p>Browse, search, and manage your team information.</p></div>
          <button className="secondary-button export-button" onClick={() => { setNotice("Your export is being prepared."); window.setTimeout(() => setNotice(""), 3000); }}><ArrowDownToLine size={16} /> Export</button>
        </div>
        <div className="directory-toolbar">
          <label className="directory-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, role, or department" aria-label="Search records" /></label>
          <label className="filter-select"><Filter size={15} /><select aria-label="Filter by status" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All statuses</option><option>Active</option><option>On leave</option><option>Pending</option></select><ChevronDown size={14} /></label>
          <button className="secondary-button filter-button" onClick={() => setFilter("All statuses")}><SlidersHorizontal size={16} /><span>Reset</span></button>
        </div>
        <div className="approval-table-wrap">
          <table className="approval-table directory-table">
            <thead><tr><th>NAME</th><th>DEPARTMENT</th><th>STATUS</th><th>LAST UPDATED</th><th /></tr></thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={`${row.name}-${row.subtitle}`}>
                  <td><div className="employee-cell"><span className={`avatar ${row.tone}`}>{row.initials}</span><div className="directory-name"><strong>{row.name}</strong><small>{row.subtitle}</small></div></div></td>
                  <td>{row.department}</td>
                  <td><span className={`status-pill status-${row.status.toLowerCase().replace(" ", "-")}`}><span />{row.status}</span></td>
                  <td>{row.date}</td>
                  <td><button className="row-more" aria-label={`Open ${row.name}`} onClick={() => setNotice(`Opened ${row.name}’s profile.`)}><ArrowRight size={16} /></button></td>
                </tr>
              ))}
              {filteredRows.length === 0 && <tr><td className="empty-row" colSpan={5}><UsersRound size={22} />No {config.noun}s match this search.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="table-pagination"><span>Showing <strong>{filteredRows.length ? 1 : 0}–{filteredRows.length}</strong> of <strong>{rows.length}</strong> records</span><div><button disabled>Previous</button><button className="page-current">1</button><button>2</button><button>3</button><button>Next <ArrowRight size={13} /></button></div></div>
      </section>

      {modalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false); }}>
          <form className="add-modal" onSubmit={addRecord}>
            <div className="modal-heading"><div><h2>Add {config.noun}</h2><p>Create a new record in your workspace.</p></div><button type="button" className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">×</button></div>
            <label className="form-field"><span>Full name</span><input autoFocus value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="e.g. Taylor Morgan" required /></label>
            <label className="form-field"><span>Department</span><select defaultValue=""><option value="" disabled>Select a department</option><option>People</option><option>Engineering</option><option>Finance</option><option>Product</option><option>Marketing</option></select></label>
            <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Cancel</button><button type="submit" className="primary-button"><Plus size={16} /> Add {config.noun}</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
