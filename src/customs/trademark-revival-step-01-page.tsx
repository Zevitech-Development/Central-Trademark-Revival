import React from "react";

import SystemHeading from "@/components/common/system-heading";
import { Separator } from "@/components/ui/separator";
import TrademarkRevivalStep01Form from "@/forms/trademark-revival-step-01-form";

function TrademarkRevivalStep01Page() {
  return (
    <main className="layout-standard md:section-padding-standard flex flex-col gap-4">
      <SystemHeading
        heading="Personal Information"
        subheading="Enter your personal information to proceed with your trademark application."
      />
      <Separator />
      <TrademarkRevivalStep01Form />
    </main>
  );
}

export default TrademarkRevivalStep01Page;
