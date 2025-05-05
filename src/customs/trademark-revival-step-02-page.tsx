import React from "react";

import SystemHeading from "@/components/common/system-heading";
import { Separator } from "@/components/ui/separator";
import TrademarkRevivalStep02Form from "@/forms/trademark-revival-step-02-form";

function TrademarkRevivalStep02Page() {
  return (
    <main className="layout-standard md:section-padding-standard flex flex-col gap-4">
      <SystemHeading
        heading="Business Information"
        subheading="Please provide accurate business details to support your trademark application."
      />
      <Separator />
      <TrademarkRevivalStep02Form />
    </main>
  );
}

export default TrademarkRevivalStep02Page;
