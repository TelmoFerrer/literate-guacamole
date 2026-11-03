import { ArrowLeftRight } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export default function TransactionsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Understand your activity"
      title="Transactions"
      description="Search, review, categorise and organise your financial activity."
      icon={ArrowLeftRight}
      nextStep="The transaction foundation starts with reliable CSV ingestion, source provenance, duplicate review and user-controlled categorisation."
    />
  );
}
