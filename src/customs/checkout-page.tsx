"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";

import {
  setInvoiceId,
  setFormId,
  setReferenceNumber,
  setCustomerInfo,
  setPackageDetails,
  setPaymentDetails,
  calculateTotalAmount,
  markAsPaid,
} from "@/store/slices/invoice-slice";

import { PackageTypeEnum } from "@/enums/package-type-enum";
import { RootState } from "@/types/store-types";
import { CheckoutPageInterface } from "@/interfaces/custom-interface";

import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { SavePaymentService } from "@/services/save-payment-service";

import { SerialNumberGenerator } from "@/utils/serial-number-generator";
import { SetPaymentCompletionCookie } from "@/utils/cookie-utils";
import { ReferenceNumberGenerator } from "@/utils/reference-number-generator";
import { PackageDetailsGenerator } from "@/utils/package-details-generator";

import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

function CheckoutPage({ formId }: CheckoutPageInterface) {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const formData = useSelector((state: RootState) => state.form);
  const invoiceData = useSelector((state: RootState) => state.invoice);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) {
    console.error("PayPal client ID is missing");
  }

  useEffect(() => {
    if (
      !formData.step01Data ||
      !formData.step02Data ||
      !formData.step03Data ||
      !formData.step04Data
    ) {
      router.push("/trademark-revival/step-01");
      return;
    }

    const setupInvoice = async () => {
      try {
        setIsLoading(true);

        if (!formData.step03Data) {
          toast.error("Incomplete Application Data", {
            description:
              "Package details are missing from your application. Please return to Step 1 and complete the required information.",
            icon: <FaCircleXmark className="text-red-600" size={24} />,
          });
          router.push("/trademark-revival/step-01");
          return;
        }

        const packageType = formData.step03Data
          .packageType as unknown as PackageTypeEnum;
        const packageInfo = PackageDetailsGenerator(packageType);

        const formIdToUse = formId || formData.formId || "";
        const referenceNumber = ReferenceNumberGenerator();

        dispatch(
          setInvoiceId(SerialNumberGenerator({ prefix: "INV", length: 12 }))
        );

        dispatch(setFormId(formIdToUse));
        dispatch(setReferenceNumber(referenceNumber));

        if (formData.step01Data) {
          dispatch(
            setCustomerInfo({
              name: `${formData.step01Data.firstName} ${formData.step01Data.lastName}`,
              email: formData.step01Data.emailAddress,
            })
          );
        }

        dispatch(
          setPackageDetails({
            packageType: packageInfo.name,
            packageAmount: packageInfo.price,
          })
        );

        const now = new Date();
        dispatch(
          setPaymentDetails({
            date: now.toISOString(),
            paymentTime: now.toISOString(),
            paymentMethod: "PayPal",
          })
        );

        dispatch(calculateTotalAmount());
      } catch (error) {
        console.error("Error setting up invoice:", error);
        toast.error("Checkout Unavailable", {
          description:
            "We encountered an issue while retrieving your checkout information. Please refresh the page or try again shortly.",
          icon: <FaCircleXmark className="text-red-600" size={24} />,
        });
      } finally {
        setIsLoading(false);
      }
    };

    setupInvoice();
  }, [dispatch, formData, formId, router]);

  // HANDLE PAYPAL ORDER CREATION
  const createOrder = async (
    _data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    if (!invoiceData.totalAmount) {
      throw new Error("Total amount is not available");
    }

    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: "Trademark Revival Services",
          reference_id: invoiceData.referenceNumber || undefined,
          amount: {
            value: invoiceData.totalAmount.toFixed(2),
            currency_code: "USD",
            breakdown: {
              item_total: {
                value: (invoiceData.packageAmount || 0).toFixed(2),
                currency_code: "USD",
              },
            },
          },
          items: [
            {
              name: invoiceData.packageType || "Trademark Revival Package",
              quantity: "1",
              unit_amount: {
                value: (invoiceData.packageAmount || 0).toFixed(2),
                currency_code: "USD",
              },
              category: "DIGITAL_GOODS",
            },
          ],
        },
      ],
      application_context: {
        brand_name: "Central Trademark Revival",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
    });
  };

  // HANDLE SUCCESSFUL PAYMENT
  const onApprove = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    try {
      setPaymentProcessing(true);

      if (!actions.order) {
        throw new Error("Order actions not available");
      }

      const orderDetails = await actions.order.capture();
      console.log("Payment successful:", orderDetails);

      dispatch(markAsPaid());

      if (invoiceData.referenceNumber) {
        SetPaymentCompletionCookie(invoiceData.referenceNumber);
      }

      const savePaymentResult = await SavePaymentService(invoiceData);

      if (savePaymentResult) {
        toast.success("Payment Successful", {
          description:
            "Thank you! Your payment has been received and your application is now being processed.",
          icon: <FaCircleCheck className="text-green-600" size={24} />,
        });

        router.push(`/checkout/thankyou?ref=${invoiceData.referenceNumber}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment Failed", {
        description:
          "There was an issue processing your payment. Please try again or contact support if the problem persists.",
        icon: <FaCircleXmark className="text-red-600" size={24} />,
      });
    } finally {
      setPaymentProcessing(false);
    }
  };

  const packagePrice = invoiceData.packageAmount || 0;
  const totalAmount = invoiceData.totalAmount || packagePrice;

  return (
    <main className="page-layout-standard section-margin-standard">
      <h1 className="md:text-5xl text-4xl tracking-tighter font-[900] font-lato text-heading !leading-[120%]">
        Checkout - <span className="text-primary">You are one step away!</span>
      </h1>

      <Separator />

      <div className="grid md:grid-cols-3 md:mt-8 gap-16">
        <div className="md:col-span-2 col-span-1 md:order-1 order-2">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Complete Your Payment
                </h2>
                <p className="text-paragraph mb-6">
                  Your trademark revival package is ready for processing.
                  Complete your payment below to start protecting your
                  intellectual property.
                </p>

                {clientId && (
                  <PayPalScriptProvider
                    options={{
                      clientId,
                      components: "buttons",
                      currency: "USD",
                      disableFunding: "paylater",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      disabled={paymentProcessing}
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  </PayPalScriptProvider>
                )}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">What happens next?</h3>
                <p className="text-paragraph text-sm">
                  Once your payment is complete, our trademark specialists will
                  begin processing your application. You&apos;ll receive a
                  confirmation email with receipt and next steps within the next
                  24 hours.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="col-span-1 md:order-2 order-1">
          <Card className="border-border sticky top-6">
            <CardHeader className="text-2xl font-semibold text-heading">
              Order Summary
            </CardHeader>

            <CardContent className="space-y-4 text-base">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span>Selected Package:</span>
                    <span className="font-medium text-heading">
                      {invoiceData.packageType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package Price:</span>
                    <span className="text-heading">
                      ${packagePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comprehensive Search:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monitoring:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Office Action Response:</span>
                    <span>$0.00</span>
                  </div>
                  {invoiceData.items &&
                    invoiceData.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.description}:</span>
                        <span>${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                </>
              )}
            </CardContent>

            <Separator className="border-border w-[95%] mx-auto mb-4" />

            <CardFooter className="flex justify-between text-lg font-semibold text-heading">
              {isLoading ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <>
                  <span>Total Amount:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
