import React from "react";
import { Metadata } from "next";

import TrademarkRevivalStep03Page from "@/customs/trademark-revival-step-03-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Step 3: Trademark Revival | Revive Your Brand - Central Trademark Revival®",
  description:
    "Take the third step toward reviving your brand with expert trademark revival registration. Complete our simple process to revive your brand identity, trademarks, and intellectual property today.",
});

function TrademarkRevivalStep03() {
  return <TrademarkRevivalStep03Page />;
}

export default TrademarkRevivalStep03;
