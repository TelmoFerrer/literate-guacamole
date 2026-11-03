"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowLeftRight,
  Bell,
  Bot,
  ChartNoAxesCombined,
  Command,
  LayoutDashboard,
  Search,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/accounts", label: "Accounts", icon: Wallet },
  { href: "/investments", label: "Investments", icon: ChartNoAxesCombined },
  { href: "/planning", label: "Planning", icon: Activity },
  { href: "/assistant", label: "AI assistant", icon: Bot },
];

const pageTitles = new Map(navigation.map((item) => [item.href, item.label]));

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentTitle = pageTitles.get(pathname) ?? "MyFinance";

  return (
    <div className="app-frame">
      <aside className="sidebar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="MyFinance home">
          <span className="brand-mark"><Activity size={19} strokeWidth={2.5} /></span>
          <span>
            <span className="brand-name">MyFinance</span>
            <span className="brand-caption" style={{ display: "block" }}>Personal finance</span>
          </span>
        </Link>

        <div className="nav-label">Workspace</div>
        <nav className="nav-list">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
            return (
              <Link
                className={`nav-link${active ? " active" : ""}`}
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
              >
                <span className="nav-icon"><Icon size={17} strokeWidth={1.8} /></span>
                <span>{item.label}</span>
                {item.href !== "/" && <span className="soon">SOON</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="workspace-card">
            <div className="workspace-overline">Personal workspace</div>
            <div className="workspace-title">My financial life</div>
            <div className="workspace-meta">Portugal · EUR</div>
          </div>
          <p className="sidebar-note">Private by design. Your financial data stays under your control.</p>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span aria-hidden="true">/</span> <strong>{currentTitle}</strong></div>
          <div className="topbar-actions">
            <div className="search-trigger" aria-label="Search is not available yet">
              <Search size={14} />
              <span>Search anything...</span>
              <span className="search-shortcut"><Command size={9} /> K</span>
            </div>
            <button className="icon-button" type="button" aria-label="Notifications (coming soon)" disabled>
              <Bell size={16} />
            </button>
            <button className="avatar" type="button" aria-label="Profile menu (coming soon)" disabled>T</button>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
