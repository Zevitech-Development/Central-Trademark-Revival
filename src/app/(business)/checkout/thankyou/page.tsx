import React from "react";
import { Metadata } from "next";

import ThankyouPage from "@/customs/thankyou-page";

import { GetPageMetadata } from "@/utils/meta-data";

export const metadata: Metadata = GetPageMetadata({
  title: "Thank You | Payment Successful - Central Trademark Revival®",
  description:
    "Thank you for completing your trademark revival payment. Your brand protection journey has begun! Track your progress and access your receipt here.",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ThankYou({ searchParams }: any) {
  const referenceNumber = searchParams?.ref || "";
  return <ThankyouPage referenceNumber={referenceNumber} />;
}
