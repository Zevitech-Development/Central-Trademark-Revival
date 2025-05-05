import React from "react";
import { Metadata } from "next";

import TrademarkRevivalStep04Page from "@/customs/trademark-revival-step-04-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Step 4: Trademark Revival | Revive Your Brand - Central Trademark Revival®",
  description:
    "Take the final step toward securing your brand with expert trademark revival registration. Complete our simple process to revive your brand identity, trademarks, and intellectual property today.",
});

function TrademarkRevivalStep04() {
  return <TrademarkRevivalStep04Page />;
}

export default TrademarkRevivalStep04;
