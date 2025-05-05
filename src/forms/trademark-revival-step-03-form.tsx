"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { setStep03Data } from "@/store/slices/form-slice";

import { TrademarkRevivalStep03FormType } from "@/types/forms-type";
import { PackageTypeEnum } from "@/enums/package-type-enum";
import { RootState } from "@/types/store-types";
import { TrademarkRevivalStep03FormSchema } from "@/schemas/trademark-revival-step-03-form-schema";

import { FormPackageContent } from "@/contents/form-content";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Form, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { SetStepCompletionCookie } from "@/utils/cookie-utils";

import { GrFormClose } from "react-icons/gr";
import { LoaderCircle } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

function TrademarkRevivalStep03Form() {
  const [loading, setLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const formId = useSelector((state: RootState) => state.form.formId);

  const form = useForm({
    resolver: zodResolver(TrademarkRevivalStep03FormSchema),
    defaultValues: {
      packageType: "",
    },
  });

  const { handleSubmit, setValue } = form;

  const onSubmit = (data: TrademarkRevivalStep03FormType) => {
    if (!formId) {
      toast.error("Missing Form ID", {
        description:
          "We couldn't find a valid Form ID. Please complete Step 1 before proceeding.",
        icon: <FaCircleXmark className="text-red-600" size={24} />,
      });
      return;
    }

    setLoading(true);

    try {
      dispatch(setStep03Data(data));
      SetStepCompletionCookie(3, formId);

      toast.success("Step 3 Completed", {
        description:
          "Your information has been successfully saved. Proceed to the next step to continue your trademark revival.",
        icon: <FaCircleCheck className="text-green-600" size={24} />,
      });

      router.push("/trademark-revival/step-04");
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

  const handlePackageSelection = (
    id: number,
    packageValue: PackageTypeEnum
  ) => {
    setSelectedPlanId(id);
    setValue("packageType", packageValue);
  };

  return (
    <section className="md:mt-8 mt-4 max-md:mb-4">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-4 lg:space-y-0">
            {FormPackageContent.map((data) => (
              <Card
                key={data.id}
                className={cn(
                  selectedPlanId === data.id &&
                    "bg-secondary-background border shadow-2xl",
                  "pt-2 pb-8 !transition-all !ease-in-out !duration-200 border-border"
                )}
              >
                <CardHeader>
                  <h2
                    className={cn(
                      selectedPlanId === data.id
                        ? "text-secondary"
                        : "text-heading",
                      "md:text-3xl text-2xl font-bold font-lato"
                    )}
                  >
                    {data.packageType}
                  </h2>
                  <p
                    className={cn(
                      selectedPlanId === data.id
                        ? "text-white/80"
                        : "text-paragraph",
                      "md:text-base text-sm"
                    )}
                  >
                    {data.packageDescription}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-col md:gap-8 gap-4">
                  <div className="flex md:items-end items-center gap-2">
                    <h1
                      className={cn(
                        selectedPlanId === data.id
                          ? "text-white"
                          : "text-heading",
                        "md:text-5xl text-3xl font-[900] font-lato"
                      )}
                    >
                      ${data.packageAmount}
                    </h1>
                    <p
                      className={cn(
                        selectedPlanId === data.id
                          ? "text-white/80"
                          : "text-secondary",
                        "text-sm font-lato font-bold"
                      )}
                    >
                      + $350/ PER CLASS USPTO FEE
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() =>
                      handlePackageSelection(data.id, data.packageValue)
                    }
                    className={cn(
                      selectedPlanId === data.id
                        ? "bg-secondary hover:bg-secondary-hover"
                        : "hover:bg-primary-hover",
                      "md:text-base text-sm md:py-6 py-5"
                    )}
                  >
                    {selectedPlanId === data.id
                      ? `${data.packageType} Selected`
                      : "Select Package"}
                  </Button>
                </CardContent>

                <CardFooter className="md:pt-8 pt-2">
                  <ul className="flex flex-col gap-4">
                    {data.details.map((detail, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <FaCheck size={16} className="text-green-500" />
                        <span
                          className={cn(
                            selectedPlanId === data.id
                              ? "text-primary-foreground"
                              : "text-paragraph ",
                            "max-md:text-sm"
                          )}
                        >
                          {detail}
                        </span>
                      </li>
                    ))}

                    {data.detailsNotOffered?.map((data2, index) => (
                      <li
                        key={index}
                        className={cn(
                          selectedPlanId === data.id
                            ? "text-white/40"
                            : "text-black/20",
                          "flex items-center space-x-2"
                        )}
                      >
                        <GrFormClose
                          size={20}
                          className={cn(
                            selectedPlanId === data.id
                              ? "text-white/40"
                              : "text-black/20"
                          )}
                        />
                        <span className="max-md:text-sm">{data2}</span>
                      </li>
                    ))}
                  </ul>
                </CardFooter>
              </Card>
            ))}
          </div>

          <FormMessage className="text-destructive text-sm" />

          <Separator className="my-8" />

          <div className="w-full flex items-center md:justify-end max-md:mb-4">
            <Button
              className="md:w-[200px] w-full h-[55px] px-8 font-bold font-lato hover:bg-primary-hover text-base rounded-[0.5rem]"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <p>Submitting</p> <LoaderCircle className="animate-spin" />
                </div>
              ) : (
                "Next Step"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default TrademarkRevivalStep03Form;
