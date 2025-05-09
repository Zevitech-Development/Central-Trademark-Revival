"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormPackageContent } from "@/contents/form-content";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DotsLine from "@/components/partials/dots-line";

import { GrFormClose } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

function PricingSection() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (!path) return;
    router.push(path);
  };

  return (
    <section className="w-full lg:mb-[2rem] md:mb-[1rem] lg:mt-[3rem] md:mt-[1rem]">
      <div className="md:mb-16 mb-8 flex flex-col items-center gap-4">
        <h1 className="text-heading md:text-5xl text-3xl font-lato font-[900] text-center leading-[120%]">
          Central Trademark{" "}
          <span className="text-secondary hover:text-heading  transition-all ease-in-out duration-200">
            {" "}
            Revival
          </span>{" "}
          Packages
        </h1>

        <DotsLine />
      </div>

      <div className="w-full grid md:grid-cols-3 gap-3">
        {FormPackageContent.map((data) => (
          <Card
            key={data.id}
            className={cn(
              "pt-2 pb-8 !transition-all !ease-in-out !duration-200 border-border"
            )}
          >
            <CardHeader>
              <h2
                className={cn(
                  "text-heading",
                  "md:text-3xl text-2xl font-bold font-lato"
                )}
              >
                {data.packageType}
              </h2>
              <p className={cn("text-paragraph", "md:text-base text-sm")}>
                {data.packageDescription}
              </p>
            </CardHeader>

            <CardContent className="flex flex-col md:gap-8 gap-4">
              <div className="flex md:items-end items-center gap-2">
                <h1
                  className={cn(
                    "text-heading",
                    "md:text-5xl text-3xl font-[900] font-lato"
                  )}
                >
                  ${data.packageAmount}
                </h1>
                <p
                  className={cn(
                    "text-secondary",
                    "text-sm font-lato font-bold"
                  )}
                >
                  + $350/ PER CLASS USPTO FEE
                </p>
              </div>

              <Link href={"/trademark-revival/step-01"}>
                <Button
                  type="button"
                  onClick={() => handleNavigation(`/trademark-revival/step-01`)}
                  className={cn(
                    "hover:bg-primary-hover",
                    "w-full md:text-base text-sm md:py-6 py-5"
                  )}
                >
                  Revive Trademark Now
                </Button>
              </Link>
            </CardContent>

            <CardFooter className="md:pt-8 pt-2">
              <ul className="flex flex-col gap-4">
                {data.details.map((detail, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <FaCheck size={16} className="text-green-500" />
                    <span className={cn("text-paragraph", "max-md:text-sm")}>
                      {detail}
                    </span>
                  </li>
                ))}

                {data.detailsNotOffered?.map((data2, index) => (
                  <li
                    key={index}
                    className={cn(
                      "text-black/20",
                      "flex items-center space-x-2"
                    )}
                  >
                    <GrFormClose size={20} className={cn("text-black/20")} />
                    <span className="max-md:text-sm">{data2}</span>
                  </li>
                ))}
              </ul>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
