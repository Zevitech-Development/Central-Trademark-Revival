import { Metadata } from "next";

import CheckoutPage from "@/customs/checkout-page";

import { GetPageMetadata } from "@/utils/meta-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const formId = params?.formId;

  return GetPageMetadata({
    title: `Checkout #${formId} | Finalize Your Trademark Revival - Central Trademark Revival®`,
    description:
      "You're one step away from securing your brand! Complete your trademark revival now to revive your brand identity, trademarks, and intellectual property today.",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Checkout({ params }: any) {
  const formId = params?.formId;

  return <CheckoutPage formId={formId} />;
}
