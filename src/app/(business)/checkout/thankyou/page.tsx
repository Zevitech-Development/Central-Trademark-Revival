import React from "react";
import { Metadata } from "next";

import ThankyouPage from "@/customs/thankyou-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Thank You | Payment Successful - Central Trademark Revival®",
  description:
    "Thank you for completing your trademark revival payment. Your brand protection journey has begun! Track your progress and access your receipt here.",
});

function ThankYou({ searchParams }: { searchParams: { ref?: string } }) {
  const referenceNumber = searchParams.ref || "";

  return <ThankyouPage referenceNumber={referenceNumber} />;
}

export default ThankYou;
