import { Bot } from "lucide-react";
import { ModulePlaceholder } from "@/components/module-placeholder";

export default function AssistantPage() {
  return (
    <ModulePlaceholder
      eyebrow="Your financial co-pilot"
      title="AI assistant"
      description="Explore your finances with natural-language questions and grounded explanations."
      icon={Bot}
      nextStep="The assistant will be introduced after the underlying financial data model and deterministic calculation services are in place. No financial data is sent to an AI provider in this foundation."
    />
  );
}
