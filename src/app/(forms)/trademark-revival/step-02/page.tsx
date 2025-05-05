import React from "react";
import { Metadata } from "next";

import TrademarkRevivalStep02Page from "@/customs/trademark-revival-step-02-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title:
    "Step 2: Trademark Revival | Revive Your Brand - Central Trademark Revival®",
  description:
    "Take the second step toward reviving your brand with expert trademark revival registration. Complete our simple process to revive your brand identity, trademarks, and intellectual property today.",
});

function TrademarkRevivalStep02() {
  return <TrademarkRevivalStep02Page />;
}

export default TrademarkRevivalStep02;
