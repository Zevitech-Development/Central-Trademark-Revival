import React from "react";
import { Metadata } from "next";

import TrademarkRevivalStep01Page from "@/customs/trademark-revival-step-01-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Step 1: Trademark Revival | Revive Your Brand - Central Trademark Revival®",
  description:
    "Take the first step toward securing your brand with expert trademark revival registration. Complete our simple process to revive your brand identity, trademarks, and intellectual property today.",
});

function TrademarkRevivalStep01() {
  return <TrademarkRevivalStep01Page />;
}

export default TrademarkRevivalStep01;
