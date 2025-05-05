import React from "react";

import SystemHeading from "@/components/common/system-heading";
import { Separator } from "@/components/ui/separator";
import TrademarkRevivalStep03Form from "@/forms/trademark-revival-step-03-form";

function TrademarkRevivalStep03Page() {
  return (
    <main className="layout-standard md:section-padding-standard flex flex-col gap-4">
      <SystemHeading
        heading="Select a Package"
        subheading="Choose the package that best suits your trademark registration needs."
      />
      <Separator />
      <TrademarkRevivalStep03Form />
    </main>
  );
}

export default TrademarkRevivalStep03Page;
