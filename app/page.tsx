"use client";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  MoreHorizontal,
  Plus,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

const activities = [
  {
    initials: "JM",
    name: "Jordan Miller",
    detail: "submitted a time-off request",
    time: "12 min ago",
    color: "avatar-blue",
  },
  {
    initials: "SK",
    name: "Sofia Kim",
    detail: "completed onboarding",
    time: "1 hour ago",
    color: "avatar-orange",
  },
  {
    initials: "DW",
    name: "Daniel Wright",
    detail: "updated their profile",
    time: "3 hours ago",
    color: "avatar-green",
  },
];

const approvals = [
  { initials: "JM", name: "Jordan Miller", type: "Annual leave", dates: "Nov 12 – Nov 14", days: "3 days", color: "avatar-blue" },
  { initials: "AT", name: "Ava Thompson", type: "Sick leave", dates: "Nov 10", days: "1 day", color: "avatar-pink" },
  { initials: "LC", name: "Liam Chen", type: "Work from home", dates: "Nov 11", days: "1 day", color: "avatar-orange" },
];

function AttendanceChart() {
  return (
    <div className="chart-wrap" aria-label="Attendance overview chart">
      <div className="chart-y-labels">
        <span>100%</span>
        <span>75%</span>
        <span>50%</span>
        <span>25%</span>
      </div>
      <svg className="attendance-chart" viewBox="0 0 640 194" role="img" aria-label="Attendance rate is trending up this month">
        <defs>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7856d8" stopOpacity=".17" />
            <stop offset="100%" stopColor="#7856d8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 66, 112, 158].map((y) => (
          <line key={y} x1="0" x2="640" y1={y} y2={y} stroke="#eef0f5" strokeDasharray="4 5" />
        ))}
        <path d="M0 85 C24 74 34 80 54 74 S92 89 108 73 S140 78 162 65 S194 78 216 55 S250 66 270 57 S302 63 324 42 S356 53 378 45 S410 58 432 35 S464 46 486 31 S520 40 540 25 S576 37 594 20 S624 30 640 14 L640 176 L0 176Z" fill="url(#chartFill)" />
        <path d="M0 85 C24 74 34 80 54 74 S92 89 108 73 S140 78 162 65 S194 78 216 55 S250 66 270 57 S302 63 324 42 S356 53 378 45 S410 58 432 35 S464 46 486 31 S520 40 540 25 S576 37 594 20 S624 30 640 14" fill="none" stroke="#7655d6" strokeWidth="3" strokeLinecap="round" />
        <circle cx="432" cy="35" r="5" fill="#fff" stroke="#7655d6" strokeWidth="3" />
      </svg>
      <div className="chart-x-labels">
        <span>Oct 14</span><span>Oct 18</span><span>Oct 22</span><span>Oct 26</span><span>Oct 30</span><span>Nov 04</span><span>Nov 07</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [clockedIn, setClockedIn] = useState(false);
  const [period, setPeriod] = useState("Last 30 days");
  const [notice, setNotice] = useState("");

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  return (
    <div className="dashboard-page">
      {notice && <div className="toast-message"><Check size={16} />{notice}</div>}
      <section className="welcome-row">
        <div>
          <div className="eyebrow"><Sparkles size={14} /> <time suppressHydrationWarning>{new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date()).toUpperCase()}</time></div>
          <h1>Good morning, Alex <span className="wave">✦</span></h1>
          <p>Here&apos;s what&apos;s happening with your people today.</p>
        </div>
        <button className={`clock-button ${clockedIn ? "clock-button-active" : ""}`} onClick={() => setClockedIn(!clockedIn)}>
          <Clock3 size={17} />
          {clockedIn ? "Clock out" : "Clock in"}
          <span className="clock-divider" />
          <strong>{clockedIn ? "09:02 AM" : "09:00 AM"}</strong>
        </button>
      </section>

      <section className="metric-grid" aria-label="Workforce metrics">
        <article className="metric-card">
          <div className="metric-top"><span>Total employees</span><span className="metric-icon purple-icon"><UsersRound size={17} /></span></div>
          <div className="metric-number">248</div>
          <div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14} /> 8.2%</span><span>vs. last month</span></div>
          <div className="metric-spark spark-purple"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </article>
        <article className="metric-card">
          <div className="metric-top"><span>Present today</span><span className="metric-icon green-icon"><Check size={17} /></span></div>
          <div className="metric-number">221<span className="metric-unit"> / 248</span></div>
          <div className="metric-foot"><span className="trend-up"><ArrowUpRight size={14} /> 94.6%</span><span>attendance rate</span></div>
          <div className="progress-track"><span style={{ width: "89%" }} /></div>
        </article>
        <article className="metric-card">
          <div className="metric-top"><span>On leave today</span><span className="metric-icon orange-icon"><CalendarDays size={17} /></span></div>
          <div className="metric-number">12</div>
          <div className="metric-foot"><span className="metric-neutral">Across 4 departments</span></div>
          <div className="avatar-stack"><span className="avatar avatar-orange">LC</span><span className="avatar avatar-blue">JM</span><span className="avatar avatar-pink">AT</span><span className="avatar-stack-more">+9</span></div>
        </article>
        <article className="metric-card">
          <div className="metric-top"><span>Open positions</span><span className="metric-icon blue-icon"><UsersRound size={17} /></span></div>
          <div className="metric-number">08</div>
          <div className="metric-foot"><span className="trend-down"><ArrowDownRight size={14} /> 2 filled</span><span>this month</span></div>
          <div className="position-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </article>
      </section>

      <section className="dashboard-columns">
        <article className="panel attendance-panel">
          <div className="panel-heading">
            <div><h2>Attendance overview</h2><p>Daily attendance across your organization</p></div>
            <label className="select-wrap">
              <select aria-label="Attendance time period" value={period} onChange={(event) => setPeriod(event.target.value)}>
                <option>Last 30 days</option><option>Last 7 days</option><option>This year</option>
              </select>
              <ChevronDown size={14} />
            </label>
          </div>
          <div className="chart-key"><span className="key-dot" /> Attendance rate <span className="chart-change"><ArrowUpRight size={14} /> 4.8%</span></div>
          <AttendanceChart />
        </article>

        <article className="panel activity-panel">
          <div className="panel-heading">
            <div><h2>Recent activity</h2><p>Latest updates from your team</p></div>
            <button className="more-button" aria-label="More activity options"><MoreHorizontal size={19} /></button>
          </div>
          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-item" key={activity.name}>
                <div className={`avatar ${activity.color}`}>{activity.initials}</div>
                <div className="activity-copy"><p><strong>{activity.name}</strong> {activity.detail}</p><span>{activity.time}</span></div>
                <span className="activity-indicator" />
              </div>
            ))}
          </div>
          <button className="text-link" onClick={() => showNotice("You’re all caught up on recent activity.")}>View all activity <ArrowRight size={15} /></button>
        </article>
      </section>

      <section className="dashboard-columns lower-columns">
        <article className="panel approvals-panel">
          <div className="panel-heading">
            <div><h2>Pending approvals <span className="heading-count">4</span></h2><p>Requests that need your attention</p></div>
            <button className="text-link desktop-link" onClick={() => showNotice("Showing all pending requests.")}>View all <ArrowRight size={15} /></button>
          </div>
          <div className="approval-table-wrap">
            <table className="approval-table">
              <thead><tr><th>EMPLOYEE</th><th>REQUEST TYPE</th><th>DATES</th><th>DURATION</th><th /></tr></thead>
              <tbody>
                {approvals.map((row) => (
                  <tr key={row.name}>
                    <td><div className="employee-cell"><span className={`avatar ${row.color}`}>{row.initials}</span><strong>{row.name}</strong></div></td>
                    <td><span className="request-label">{row.type}</span></td>
                    <td>{row.dates}</td>
                    <td>{row.days}</td>
                    <td><div className="row-actions"><button aria-label={`Approve ${row.name}`} className="approve-button" onClick={() => showNotice(`${row.name}’s request approved.`)}><Check size={15} /></button><button aria-label={`Open ${row.name} request`} className="row-more" onClick={() => showNotice(`Request from ${row.name} opened.`)}><MoreHorizontal size={17} /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="text-link mobile-approval-link" onClick={() => showNotice("Showing all pending requests.")}>View all requests <ArrowRight size={15} /></button>
        </article>

        <article className="panel birthdays-panel">
          <div className="panel-heading">
            <div><h2>Coming up</h2><p>Birthdays & work anniversaries</p></div>
            <button className="more-button" aria-label="More upcoming events"><MoreHorizontal size={19} /></button>
          </div>
          <div className="birthday-date"><span className="birthday-day">10</span><span><strong>November</strong><small>TUESDAY</small></span><span className="birthday-today">In 3 days</span></div>
          <div className="birthday-person"><span className="birthday-emoji">🎂</span><div><strong>Priya Sharma</strong><span>Product Designer · Birthday</span></div><button className="send-wish" onClick={() => showNotice("Birthday wishes are ready to send.")}>Send a wish</button></div>
          <div className="birthday-person"><span className="birthday-emoji">🎉</span><div><strong>Marcus Lee</strong><span>Engineering · 2 years at Kodanda</span></div><button className="send-wish" onClick={() => showNotice("Anniversary wishes are ready to send.")}>Celebrate</button></div>
        </article>
      </section>
      <div className="dashboard-footer"><span>People are at the heart of everything.</span><button onClick={() => showNotice("Quick actions are coming soon.")}><Plus size={15} /> Quick actions</button></div>
    </div>
  );
}
