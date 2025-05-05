import { InvoiceState } from "@/states/store-states";

import { SetPaymentCompletionCookie } from "@/utils/cookie-utils";

export const SavePaymentService = async (
  invoice: InvoiceState
): Promise<boolean> => {
  try {
    console.log("Saving payment details:", invoice);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (invoice.referenceNumber) {
      SetPaymentCompletionCookie(invoice.referenceNumber);
    }

    return true;
  } catch (error) {
    console.error("Error saving payment:", error);
    return false;
  }
};
