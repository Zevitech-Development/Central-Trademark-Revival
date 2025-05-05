import React from "react";

import SystemHeading from "@/components/common/system-heading";
import { Separator } from "@/components/ui/separator";
import TrademarkRevivalStep04Form from "@/forms/trademark-revival-step-04-form";

function TrademarkRevivalStep04Page() {
  return (
    <main className="layout-standard md:section-padding-standard flex flex-col gap-4">
      <SystemHeading
        heading="Acknowledgement & Service Agreement"
        subheading="Review and accept the terms to proceed with your trademark registration."
      />
      <Separator />
      <TrademarkRevivalStep04Form />
    </main>
  );
}

export default TrademarkRevivalStep04Page;
