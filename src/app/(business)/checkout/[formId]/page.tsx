import React from "react";
import { Metadata } from "next";

import { CheckoutPageInterface } from "@/interfaces/custom-interface";

import CheckoutPage from "@/customs/checkout-page";

import { GetPageMetadata } from "@/utils/meta-data";

type CheckoutPageProps = {
  params: {
    formId: string;
  };
};

export const generateMetadata = ({ params }: CheckoutPageProps): Metadata => {
  return GetPageMetadata({
    title: `Checkout #${params.formId} | Finalize Your Trademark Revival - Central Trademark Revival®`,
    description:
      "You're one step away from securing your brand! Complete your trademark revival now to revive your brand identity, trademarks, and intellectual property today.",
  });
};

function Checkout({ params }: CheckoutPageProps) {
  const { formId } = params;

  return <CheckoutPage formId={formId} />;
}

export default Checkout;
