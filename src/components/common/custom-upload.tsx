"use client";

import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import Image from "next/image";

import { CustomUploadInterface } from "@/interfaces/common-interface";
import { CustomUploadType } from "@/types/common-type";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { LoaderCircle, UploadCloud, XCircle } from "lucide-react";

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (
          error: unknown,
          result: { event: string; info: { secure_url: string } }
        ) => void
      ) => CustomUploadType;
    };
  }
}

const CustomUpload = <T extends FieldValues>({
  control,
  name,
  label,
  onUploadSuccess,
}: CustomUploadInterface<T>) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => console.log("Cloudinary script loaded");
      document.body.appendChild(script);
    }
  }, []);

  const handleUpload = (fieldOnChange: (value: string | null) => void) => {
    const cloudName = "dptujgmbz";
    const uploadPreset = "central_trademark_revival_preset";

    if (typeof window !== "undefined" && window.cloudinary) {
      setIsLoading(true);

      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          sources: ["local", "url"],
          multiple: false,
          maxFiles: 1,
          cropping: true,
          croppingAspectRatio: 1,
        },
        (error, result) => {
          setIsLoading(false);

          if (!error && result.event === "success" && result.info?.secure_url) {
            setPreviewUrl(result.info.secure_url);
            fieldOnChange(result.info.secure_url);

            if (onUploadSuccess) {
              onUploadSuccess(result.info.secure_url);
            }
          }
        }
      );

      myWidget.open();
    } else {
      console.error("Cloudinary is not loaded");
    }
  };

  const handleRemoveImage = (fieldOnChange: (value: string | null) => void) => {
    setPreviewUrl(null);
    fieldOnChange(null);

    if (onUploadSuccess) {
      onUploadSuccess("");
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-heading md:text-base text-sm font-normal">
            {label}
          </FormLabel>
          <FormControl>
            <div className="w-full flex flex-col items-center gap-4">
              {previewUrl ? (
                <div className="relative w-[150px] h-[150px]">
                  <Image
                    src={previewUrl}
                    alt="Uploaded Logo Preview"
                    width={150}
                    height={150}
                    className="rounded-md border border-border"
                  />

                  <Button
                    size={"icon"}
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                    onClick={() => handleRemoveImage(field.onChange)}
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              ) : null}

              <Button
                className="rounded-[5px] h-[55px] w-full flex items-center justify-center md:text-base text-sm hover:bg-primary-hover"
                type="button"
                onClick={() => handleUpload(field.onChange)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span>Please wait</span>
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                  </div>
                ) : (
                  <>
                    <UploadCloud className="!w-[20px] !h-[20px]" />
                    {previewUrl ? "Change Logo" : "Upload Logo"}
                  </>
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage className="text-destructive text-sm" />
        </FormItem>
      )}
    />
  );
};

export default CustomUpload;
