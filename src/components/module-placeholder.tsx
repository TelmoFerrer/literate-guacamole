import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export function ModulePlaceholder({
  eyebrow,
  title,
  description,
  icon: Icon,
  nextStep,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  nextStep: string;
}) {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
      </div>
      <section className="module-empty">
        <div className="empty-icon"><Icon size={19} /></div>
        <h2>This workspace is being prepared</h2>
        <p>{nextStep}</p>
        <span className="module-tag">Coming in a future sprint</span>
        <div>
          <Link className="secondary-link" href="/">
            Back to overview <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
