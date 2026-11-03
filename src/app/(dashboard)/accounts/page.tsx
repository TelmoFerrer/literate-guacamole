import { Wallet } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export default function AccountsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Your money, together"
      title="Accounts"
      description="Bring your current accounts, savings and cash balances into one place."
      icon={Wallet}
      nextStep="The first account workflow will support manual account setup and CSV imports. Bank aggregation will be added only after provider coverage and eligibility are validated."
    />
  );
}
