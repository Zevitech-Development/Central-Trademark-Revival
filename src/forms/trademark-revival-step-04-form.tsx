"use client";

import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { setStep04Data } from "@/store/slices/form-slice";

import { TrademarkRevivalStep04FormSchema } from "@/schemas/trademark-revival-step-04-form-schema";

import { TrademarkRevivalStep04FormType } from "@/types/forms-type";
import { RootState } from "@/types/store-types";

import { SendPaymentPendingEmail } from "@/services/email-service";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CustomCheckbox02 } from "@/components/common/custom-checkboxes";

import { IsStepCompleted, SetStepCompletionCookie } from "@/utils/cookie-utils";
import { PackageDetailsGenerator } from "@/utils/package-details-generator";

import { LoaderCircle } from "lucide-react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

function TrademarkRevivalStep04Form() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const formId = useSelector((state: RootState) => state.form.formId);
  const step01Data = useSelector((state: RootState) => state.form.step01Data);
  const step02Data = useSelector((state: RootState) => state.form.step02Data);
  const step03Data = useSelector((state: RootState) => state.form.step03Data);

  useEffect(() => {
    const step1Completed = IsStepCompleted(1);
    const step2Completed = IsStepCompleted(2);
    const step3Completed = IsStepCompleted(3);

    if (
      !step1Completed ||
      !step2Completed ||
      !step3Completed ||
      !formId ||
      !step01Data ||
      !step02Data ||
      !step03Data
    ) {
      toast.error("Please complete all previous steps first");
      router.push("/trademark-revival/step-01");
    }
  }, [formId, router, step01Data, step02Data, step03Data]);

  const form = useForm({
    resolver: zodResolver(TrademarkRevivalStep04FormSchema),
    defaultValues: {
      isAcknowledged: false,
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: TrademarkRevivalStep04FormType) => {
    if (!formId || !step01Data || !step03Data) {
      toast.error("Missing Form ID", {
        description:
          "We couldn't find a valid Form ID. Please complete Step 1 before proceeding.",
        icon: <FaCircleXmark className="text-red-600" size={24} />,
        className: "items-start",
        descriptionClassName: "text-start",
      });
      return;
    }

    setLoading(true);

    try {
      dispatch(setStep04Data(data));
      SetStepCompletionCookie(4, formId);

      try {
        const packageType = step03Data.packageType;
        const packageDetails = PackageDetailsGenerator(packageType);

        await SendPaymentPendingEmail(
          { formId, step01Data, step02Data, step03Data, step04Data: data },
          packageDetails.name,
          packageDetails.price
        );
      } catch (emailError) {
        console.error("Error sending payment pending email:", emailError);
      }

      toast.success("Step 4 Completed", {
        description:
          "Your information has been successfully saved. Proceed to the checkout to finish trademark revival.",
        icon: <FaCircleCheck className="text-green-600" size={24} />,
      });
      router.push(`/checkout/${formId}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Submission Failed", {
          description: `There was an issue processing your request: ${error.message}`,
          icon: <FaCircleXmark className="text-red-600" size={24} />,
        });
      } else {
        toast.error("Unexpected Error", {
          description:
            "Something went wrong on our end. Please try again or contact support if the issue persists.",
          icon: <FaCircleXmark className="text-red-600" size={24} />,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="md:mt-8 mt-4 max-md:mb-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* ACKNOWLEDGEMENT */}
          <CustomCheckbox02
            control={control}
            name="isAcknowledged"
            label="1. Important Notice: Please read and acknowledge"
          />

          <Separator className="mt-4" />

          <div className="w-full flex items-center md:justify-end max-md:mb-4">
            <Button
              className="md:w-[200px] w-full h-[55px] px-8 font-bold font-lato hover:bg-primary-hover text-base rounded-[0.5rem]"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <p>Proceeding</p> <LoaderCircle className="animate-spin" />
                </div>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default TrademarkRevivalStep04Form;
