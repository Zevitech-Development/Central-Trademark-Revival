import React from "react";
import Image from "next/image";
import { FieldValues } from "react-hook-form";

import { CustomSelectionInterface } from "@/interfaces/common-interface";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const CustomSelection = <T extends FieldValues>({
  control,
  name,
  label,
  options,
}: CustomSelectionInterface<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel className="text-heading md:text-base text-sm font-normal">
            {label}
          </FormLabel>
          <FormControl>
            <div className="w-full grid md:grid-cols-4 grid-cols-2 gap-4">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex flex-col gap-2 items-center"
                >
                  <div
                    className={`h-[180px] w-full rounded-[10px] bg-muted border border-border flex-center p-4 cursor-pointer ${
                      field.value === option.value
                        ? "!ring-primary ring-2"
                        : "hover:bg-muted-hover"
                    }`}
                    onClick={() => field.onChange(option.value)}
                  >
                    <Image
                      src={option.image}
                      className="w-[60%] rounded-sm"
                      alt={`Select ${option.label}`}
                    />
                  </div>
                  <h1
                    className={`md:text-base text-sm text-heading font-medium ${
                      field.value === option.value ? "text-primary" : ""
                    }`}
                  >
                    {option.label}
                  </h1>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage className="text-destructive text-sm" />
        </FormItem>
      )}
    />
  );
};

export default CustomSelection;
