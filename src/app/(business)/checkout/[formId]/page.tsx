import { Metadata } from "next";

import CheckoutPage from "@/customs/checkout-page";

import { GetPageMetadata } from "@/utils/meta-data";

export async function generateMetadata({
  params,
}: {
  params: { formId: string };
}): Promise<Metadata> {
  return GetPageMetadata({
    title: `Checkout #${params.formId} | Finalize Your Trademark Revival - Central Trademark Revival®`,
    description:
      "You're one step away from securing your brand! Complete your trademark revival now to revive your brand identity, trademarks, and intellectual property today.",
  });
}

export default async function Checkout({
  params,
}: {
  params: { formId: string };
}) {
  return <CheckoutPage formId={params.formId} />;
}
