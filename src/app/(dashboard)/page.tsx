import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  ChartNoAxesCombined,
  Plus,
  Wallet,
} from "lucide-react";

const metrics = [
  {
    label: "Net worth",
    icon: ChartNoAxesCombined,
    foot: "Assets minus liabilities",
  },
  {
    label: "Cash",
    icon: Wallet,
    foot: "Across your connected accounts",
  },
  {
    label: "Investments",
    icon: ArrowUpRight,
    foot: "Portfolio value",
  },
  {
    label: "Monthly cash flow",
    icon: ArrowLeftRight,
    foot: "Income minus expenses",
  },
];

export default function OverviewPage() {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">Your financial picture</div>
          <h1 className="page-title">Overview</h1>
          <p className="page-description">A clear view of everything you own, owe, earn and spend.</p>
        </div>
        <Link className="primary-button" href="/accounts">
          <Plus size={15} /> Add your first account
        </Link>
      </div>

      <section className="metrics-grid" aria-label="Financial summary">
        {metrics.map(({ label, icon: Icon, foot }) => (
          <article className="metric-card" key={label}>
            <div className="metric-top">
              <span>{label}</span>
              <span className="metric-icon"><Icon size={15} strokeWidth={1.8} /></span>
            </div>
            <div className="metric-value" aria-label="No data yet">—</div>
            <div className="metric-foot">{foot}</div>
          </article>
        ))}
      </section>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Cash flow</div>
              <div className="panel-subtitle">Income and expenses over time</div>
            </div>
            <span className="panel-action">Monthly view</span>
          </div>
          <div className="empty-chart">
            <div className="empty-icon"><ActivityIcon /></div>
            <div className="empty-title">Your cash flow will appear here</div>
            <p className="empty-copy">Import transactions or connect an account to start seeing where your money comes from and where it goes.</p>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Your accounts</div>
              <div className="panel-subtitle">Cash, savings and investments</div>
            </div>
            <Link className="panel-action" href="/accounts">View all</Link>
          </div>
          <div className="account-empty">
            <div className="empty-icon"><Wallet size={18} /></div>
            <div className="empty-title">No accounts yet</div>
            <p className="empty-copy">Bring your accounts together for one complete financial picture.</p>
            <Link className="secondary-link" href="/accounts">Add an account <ArrowUpRight size={13} /></Link>
          </div>
        </section>
      </div>

      <section className="panel activity-panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">Recent activity</div>
            <div className="panel-subtitle">Your latest transactions across all accounts</div>
          </div>
          <Link className="panel-action" href="/transactions">All transactions</Link>
        </div>
        <div className="activity-empty">
          <span>No transactions to show. Import a statement to get started.</span>
        </div>
      </section>

      <p className="disclaimer">No financial data is connected yet. Figures will appear after you add accounts and import or connect your data.</p>
    </div>
  );
}

function ActivityIcon() {
  return <ArrowDownLeft size={18} />;
}
