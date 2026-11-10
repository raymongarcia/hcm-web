"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  CircleHelp,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  Settings2,
  UsersRound,
  WalletCards,
} from "lucide-react";

const navigation = [
  { label: "Overview", href: "/", icon: LayoutDashboard },
  { label: "People", href: "/people", icon: UsersRound },
  { label: "Time & attendance", href: "/attendance", icon: Clock3 },
  { label: "Time off", href: "/time-off", icon: CalendarDays },
  { label: "Payroll", href: "/payroll", icon: WalletCards },
  { label: "Hiring", href: "/hiring", icon: BriefcaseBusiness },
  { label: "Performance", href: "/performance", icon: ChartNoAxesCombined },
  { label: "Learning", href: "/learning", icon: GraduationCap },
  { label: "Reports", href: "/reports", icon: Activity },
];

const moduleLabels: Record<string, string> = {
  people: "People",
  attendance: "Time & attendance",
  "time-off": "Time off",
  payroll: "Payroll",
  hiring: "Hiring",
  performance: "Performance",
  learning: "Learning",
  reports: "Reports",
  settings: "Role settings",
};

export function getModuleLabel(pathname: string) {
  const section = pathname.split("/")[1];
  return moduleLabels[section] ?? "Overview";
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Link className="brand" href="/" onClick={() => setSidebarOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="brand-name">People</span>
          <span className="brand-caption">PEOPLE CLOUD</span>
        </Link>

        <div className="workspace-picker">
          <div className="workspace-avatar">Y</div>
          <div className="workspace-copy">
            <strong>Your organization</strong>
            <span>Workspace</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                className={`nav-link ${active ? "nav-link-active" : ""}`}
                href={href}
                key={href}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{label}</span>
                {label === "Time off" && <span className="nav-count">4</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="nav-label">PREFERENCES</div>
          <Link
            className={`nav-link ${pathname === "/settings" ? "nav-link-active" : ""}`}
            href="/settings"
          >
            <Settings2 size={18} strokeWidth={1.8} />
            <span>Role settings</span>
          </Link>
          <div className="help-card">
            <div className="help-icon">
              <CircleHelp size={18} />
            </div>
            <div>
              <strong>Need a hand?</strong>
              <span>Visit our help center</span>
            </div>
            <ArrowUpRight size={15} />
          </div>
          <div className="sidebar-profile">
            <div className="avatar avatar-small avatar-purple">AR</div>
            <div className="profile-copy">
              <strong>Alex Rivera</strong>
              <span>HR Administrator</span>
            </div>
            <ChevronDown size={15} />
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button
            aria-label="Open navigation"
            className="icon-button mobile-menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{getModuleLabel(pathname)}</strong>
          </div>
          <div className="topbar-actions">
            <label className="top-search">
              <Search size={17} />
              <input aria-label="Search" placeholder="Search anything..." />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button top-help" aria-label="Help">
              <CircleHelp size={19} />
            </button>
            <button className="icon-button notification-button" aria-label="Notifications">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <button className="top-avatar" aria-label="Open account menu">
              AR
            </button>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
