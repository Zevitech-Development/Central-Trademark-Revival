"use client";

import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import AboutImg from "../../../public/images/about-img.jpeg";

function AboutSection() {
  return (
    <section className="lg:max-w-[1050px] max-lg:layout-standard mx-auto w-full bg-white rounded-md shadow-xl grid lg:grid-cols-2 gap-10 relative -top-14">
      <div className="py-12 md:pl-8 max-md:px-4">
        <div className="flex items-center gap-4 mb-4">
          <Separator className="w-10 h-[3px] bg-secondary rounded-lg" />
          <h3 className="text-heading font-lato font-bold text-xl">About Us</h3>
        </div>

        <div className="space-y-4">
          <h1 className="text-heading text-3xl font-[700] font-lato">
            Central Trademark Revival®
          </h1>
          <p className="text-paragraph md:text-base text-sm">
            At Central Trademark Revival®, we specialize in helping you breathe
            new life into your dead or abandoned trademark applications. Our
            mission is to provide expert guidance and free consultations to help
            you navigate the trademark revival process seamlessly. With our
            trusted team by your side, your trademark aspirations are closer
            than ever.
          </p>

          <div className="flex items-center gap-2 md:flex-row flex-col max-md:pt-8">
            <Button
              onClick={() => {
                if (
                  window.Tawk_API &&
                  typeof window.Tawk_API.maximize === "function"
                ) {
                  window.Tawk_API.maximize();
                } else {
                  window.open(
                    "https://tawk.to/chat/681517dbc915a4190c8c0c5f/1iq96ad9l",
                    "_blank"
                  );
                }
              }}
              className="h-12 px-7 font-bold font-lato hover:bg-primary-hover text-sm rounded-[0.5rem] bg-primary max-md:w-full"
            >
              Get Free Consultation Now
            </Button>

            <Button
              className="h-12 px-7 font-bold font-lato hover:bg-secondary-hover text-sm rounded-[0.5rem] bg-secondary max-md:w-full"
              onClick={() => {
                if (
                  window.Tawk_API &&
                  typeof window.Tawk_API.maximize === "function"
                ) {
                  window.Tawk_API.maximize();
                } else {
                  window.open(
                    "https://tawk.to/chat/681517dbc915a4190c8c0c5f/1iq96ad9l",
                    "_blank"
                  );
                }
              }}
            >
              Chat Now
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-slate-400 h-[430px] overflow-hidden absolute -top-16 right-[32px] max-lg:hidden">
        <Image className="w-full h-full" src={AboutImg} alt="image" />
      </div>
    </section>
  );
}

export default AboutSection;
