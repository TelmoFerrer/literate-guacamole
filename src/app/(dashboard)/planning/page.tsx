import { Activity } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export default function PlanningPage() {
  return (
    <ModulePlaceholder
      eyebrow="Plan ahead"
      title="Planning"
      description="Track your goals, understand future cash flow and explore scenarios."
      icon={Activity}
      nextStep="Planning will build on verified account balances, transaction history, assets, liabilities and explicit forecast assumptions."
    />
  );
}
