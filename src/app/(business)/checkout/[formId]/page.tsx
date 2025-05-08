import React from "react";
import { Metadata } from "next";

import CheckoutPage from "@/customs/checkout-page";

import { GetPageMetadata } from "@/utils/meta-data";

type CheckoutParams = {
  formId: string;
};

export const generateMetadata = async ({
  params,
}: {
  params: CheckoutParams;
}): Promise<Metadata> => {
  return GetPageMetadata({
    title: `Checkout #${params.formId} | Finalize Your Trademark Revival - Central Trademark Revival®`,
    description:
      "You're one step away from securing your brand! Complete your trademark revival now to revive your brand identity, trademarks, and intellectual property today.",
  });
};

export default function Checkout({
  params,
}: {
  params: CheckoutParams;
}): React.JSX.Element {
  const { formId } = params;

  return <CheckoutPage formId={formId} />;
}
