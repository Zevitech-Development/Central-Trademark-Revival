import React from "react";
import { FieldValues } from "react-hook-form";

import {
  CustomCheckbox01Interface,
  CustomCheckbox02Interface,
} from "@/interfaces/common-interface";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

export const CustomCheckbox01 = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  priceLabel,
}: CustomCheckbox01Interface<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-8">
          <FormLabel className="text-heading text-2xl font-semibold">
            {label}
          </FormLabel>
          {description && (
            <FormDescription className="md:text-base text-sm leading-relaxed font-normal">
              {description}
            </FormDescription>
          )}
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={name as string}
                checked={field.value}
                onCheckedChange={(checked) =>
                  field.onChange(checked as boolean)
                }
                className="rounded-lg !animation-standard !duration-200"
              />
              {priceLabel && (
                <label
                  htmlFor={name as string}
                  className="md:text-base text-sm font-normal text-heading leading-none"
                >
                  {priceLabel}
                </label>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-destructive text-sm" />
        </FormItem>
      )}
    />
  );
};

export const CustomCheckbox02 = <T extends FieldValues>({
  control,
  name,
  label,
}: CustomCheckbox02Interface<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="md:space-y-12 space-y-4">
          <FormLabel className="text-heading md:text-2xl text-xl font-semibold">
            {label}
          </FormLabel>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-heading font-lato font-bold text-lg">
                A. Mandatory Follow-up Call
              </h1>
              <p className="md:text-base text-sm leading-relaxed font-normal">
                After completing your service fee payment, you must answer a
                call from your assigned case analyst. This call is essential for
                providing you with a trademark search and clearance report. The
                analyst will help determine the relevant classifications for
                your trademark based on your business description.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-heading font-lato font-bold text-lg">
                B. No Further Actions without Call
              </h1>
              <p className="md:text-base text-sm leading-relaxed font-normal">
                Please note that without answering the follow-up call, we will
                not be able to proceed with your trademark revival process.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-heading font-lato font-bold text-lg">
                C. Federal Fee Requirment
              </h1>
              <p className="md:text-base text-sm leading-relaxed font-normal">
                In addition to the service fee, a $350 federal fee per
                classification is required by the USPTO (United States Patent
                and Trademark Office) for filing your trademark. This fee will
                be collected after we have reviewed your application and
                prepared your trademark filing.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-heading font-lato font-bold text-lg">
                Acknowledgement
              </h1>
              <div className="flex flex-col gap-2">
                <p className="md:text-base text-sm leading-relaxed font-normal">
                  - Agree to receive a follow-up call from your case analyst.
                </p>
                <p className="md:text-base text-sm leading-relaxed font-normal">
                  - Understand that without answering the call, the registration
                  process cannot proceed.
                </p>
                <p className="md:text-base text-sm leading-relaxed font-normal">
                  - Acknowledge there is an additional federal fee of $350 per
                  classification that must be paid to the USPTO after the
                  application is prepared.
                </p>
              </div>
            </div>
          </div>

          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={name as string}
                checked={field.value}
                onCheckedChange={(checked) =>
                  field.onChange(checked as boolean)
                }
                className="rounded-lg !animation-standard !duration-200"
              />

              <label
                htmlFor={name as string}
                className="md:text-base text-sm font-normal text-heading leading-none"
              >
                I acknowledge that I have read and understood the above
                information and agree to the terms and conditions.
              </label>
            </div>
          </FormControl>
          <FormMessage className="text-destructive text-sm" />
        </FormItem>
      )}
    />
  );
};
