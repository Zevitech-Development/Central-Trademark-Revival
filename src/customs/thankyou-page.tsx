"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

import { setPdfUrl } from "@/store/slices/invoice-slice";

import { RootState } from "@/types/store-types";
import { ThankyouPageInterface } from "@/interfaces/custom-interface";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { GenerateInvoice } from "@/utils/generate-invoice";
import { FormatDate } from "@/utils/format-date";
import { FormatTime } from "@/utils/format-time";

import { Download, Mail } from "lucide-react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const ThankyouPage = ({ referenceNumber }: ThankyouPageInterface) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  // const [isEmailSent, setIsEmailSent] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const formData = useSelector((state: RootState) => state.form);
  const invoiceData = useSelector((state: RootState) => state.invoice);

  useEffect(() => {
    const validateData = async () => {
      try {
        setIsLoading(true);
        if (
          !invoiceData.isPaid ||
          (referenceNumber && invoiceData.referenceNumber !== referenceNumber)
        ) {
          setTimeout(() => {
            toast.error("Invoice Not Found", {
              description:
                "We couldn't locate the invoice. Redirecting you to the homepage.",
              icon: <FaCircleXmark className="text-red-600" size={24} />,
            });
            router.push("/");
          }, 3000);
          return;
        }

        setIsLoading(false);

        if (!invoiceData.pdfUrl) {
          await handleDownloadReceipt(false);
        }
      } catch (error) {
        console.error("Error loading invoice data:", error);
        toast.error("Payment Information Unavailable", {
          description:
            "There was a problem loading your payment details. Please try again shortly.",
          icon: <FaCircleXmark className="text-red-600" size={24} />,
        });
      }
    };

    validateData();
  }, [invoiceData, referenceNumber, router]);

  const handleDownloadReceipt = async (shouldDownload = true) => {
    try {
      setIsPdfGenerating(true);

      if (!formData.step01Data) {
        toast.error("Customer Information Missing", {
          description:
            "We couldn't retrieve the required customer data. Please restart the form.",
          icon: <FaCircleXmark className="text-red-600" size={24} />,
        });
        return;
      }

      const pdfOutput = await GenerateInvoice(invoiceData, formData.step01Data);
      dispatch(setPdfUrl(pdfOutput));

      if (shouldDownload) {
        const link = document.createElement("a");
        link.href = pdfOutput;
        link.download = `receipt-${
          invoiceData.referenceNumber || "invoice"
        }.pdf`;
        link.click();
      }

      if (shouldDownload) {
        toast.success("Receipt Ready", {
          description: "Your receipt has been downloaded successfully.",
          icon: <FaCircleCheck className="text-green-600" size={24} />,
        });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Receipt Error", {
        description:
          "There was a problem generating your receipt. Please try again.",
        icon: <FaCircleXmark className="text-red-600" size={24} />,
      });
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <main className="layout-standard section-padding-standard section-margin-standard flex-center flex-col gap-12">
      {isLoading ? (
        <div className="w-full max-w-[574px] space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <>
          <Card className="md:w-[574.56px] w-full md:rounded-[40px] rounded-[20px] shadow-xl bg-background border-border py-[40px] flex flex-col gap-[35px] md:px-8 px-4">
            <CardHeader className="flex flex-col items-center w-full py-0 px-0">
              <Image
                src="https://res.cloudinary.com/dptujgmbz/image/upload/v1746051218/central-trademark-revival_djebbv.png"
                alt="Central Trademark Revival"
                width={250}
                height={80}
              />
            </CardHeader>

            <Separator />

            <CardContent className="px-0 py-0 flex flex-col gap-[27px]">
              <div className="flex flex-col gap-[24px] w-full">
                <div className="w-full flex items-center justify-between">
                  <h1 className="md:text-base text-sm">Reference Number</h1>
                  <p className="md:text-base text-sm text-heading font-medium">
                    {invoiceData.referenceNumber || "N/A"}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <h1 className="md:text-base text-sm">Payment Date</h1>
                  <p className="md:text-base text-sm text-heading">
                    {invoiceData.date ? FormatDate(invoiceData.date) : "N/A"}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <h1 className="md:text-base text-sm">Payment Time</h1>
                  <p className="md:text-base text-sm text-heading">
                    {invoiceData.paymentTime
                      ? FormatTime(invoiceData.paymentTime)
                      : "N/A"}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <h1 className="md:text-base text-sm">Payment Method</h1>
                  <p className="md:text-base text-sm text-heading">
                    {invoiceData.paymentMethod || "PayPal"}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <h1 className="md:text-base text-sm">Customer Name</h1>
                  <p className="md:text-base text-sm text-heading">
                    {formData.step01Data
                      ? `${formData.step01Data.firstName} ${formData.step01Data.lastName}`
                      : "N/A"}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <h1 className="md:text-base text-sm">Trademark Package</h1>
                  <p className="md:text-base text-sm text-heading">
                    {invoiceData.packageType || "N/A"}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between">
                  <h1 className="md:text-base text-sm">Package Price</h1>
                  <p className="md:text-base text-sm text-heading font-medium">
                    ${(invoiceData.packageAmount || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-[24px] w-full">
                <div className="w-full flex items-center justify-between font-bold text-heading">
                  <h1 className="text-lg">Total Amount</h1>
                  <p className="text-lg">
                    ${(invoiceData.totalAmount || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-0">
              <p className="text-sm text-paragraph">
                Thank you for choosing Central Trademark Revival® for your
                trademark needs. Our team will begin processing your application
                immediately. You will receive an email confirmation with details
                about next steps within 24 hours.
              </p>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-4">
            <div className="max-md:w-full flex gap-2 items-center md:flex-row flex-col">
              <Button
                className="md:w-[300px] w-full h-[50px] mx-auto rounded-[12px] text-base hover:bg-primary-hover"
                onClick={() => handleDownloadReceipt(true)}
                disabled={isPdfGenerating}
              >
                {isPdfGenerating ? "Generating..." : "Download Receipt"}{" "}
                <Download className="ml-2 h-4 w-4" />
              </Button>

              <Button
                className="md:w-[300px] w-full bg-secondary h-[50px] mx-auto rounded-[12px] text-base hover:bg-secondary-hover"
                onClick={() => router.push("/contact")}
              >
                Contact Us <Mail className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <Button
              className="md:w-[600px] w-full bg-muted text-heading h-[50px] mx-auto rounded-[12px] text-base hover:bg-muted/80"
              onClick={() => router.push("/")}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default ThankyouPage;
