"use client";

import React from "react";
import Image from "next/image";

import { LegalTeamContent } from "@/contents/home-page-content";

import DotsLine from "@/components/partials/dots-line";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

function LegalTeamSection() {
  const mailHandler = (email: string) => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          email
        )}`,
        "_blank"
      );
    }, 1000);
  };

  return (
    <section className="w-full md:mb-12">
      <div className="mb-4 flex flex-col items-center gap-4">
        <h1 className="text-heading md:text-5xl text-3xl font-lato font-[900] text-center leading-[120%]">
          Our <span className="text-secondary hover:text-black">Team</span>
        </h1>

        <DotsLine />
      </div>

      <p className="md:text-base text-sm text-paragraph leading-relaxed lg:max-w-[1000px] mx-auto text-center mb-12">
        At Central Trademark Revival®, our team is made up of highly skilled
        professionals dedicated to providing expert support in trademark
        revival, patents, copyrights, and other intellectual property matters.
        With a strong understanding of legal procedures and meticulous attention
        to detail, we ensure a seamless and efficient experience for our
        clients. Whether it&apos;s filing applications or conducting in-depth
        research, our team is here to support you in protecting and restoring
        your intellectual property every step of the way.
      </p>

      {/* CAROUSEL */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {LegalTeamContent.map((data, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/4 basis-full"
            >
              <div className="p-1">
                <Card className="overflow-hidden">
                  <CardHeader className="p-0 h-[200px] overflow-hidden">
                    <Image
                      src={data.img}
                      alt="Employee"
                      className="w-full h-[200px] object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-5 text-center space-y-4">
                    <div className="space-y-1">
                      <p className="text-heading text-base font-[500]">
                        {data.name}
                      </p>
                      <p className="text-sm">{data.designation}</p>
                    </div>
                    <div className="flex item-center gap-2 justify-center">
                      <Button
                        type="button"
                        className="font-bold font-lato hover:bg-primary-hover"
                        onClick={() => {
                          mailHandler(data.email);
                        }}
                      >
                        Email Now
                      </Button>

                      <Button
                        type="button"
                        className="font-bold font-lato hover:bg-secondary-hover bg-secondary"
                        onClick={() => {
                          mailHandler(data.email);
                        }}
                      >
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-md:hidden" />
        <CarouselNext className="max-md:hidden" />
      </Carousel>
    </section>
  );
}

export default LegalTeamSection;
