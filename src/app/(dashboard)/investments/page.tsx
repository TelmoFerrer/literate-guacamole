import { ChartNoAxesCombined } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export default function InvestmentsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Your portfolio"
      title="Investments"
      description="See your holdings, valuations, allocation and investment performance."
      icon={ChartNoAxesCombined}
      nextStep="Investment data will initially be imported from supported files. Brokerage connectivity will be evaluated separately from bank-account aggregation."
    />
  );
}
