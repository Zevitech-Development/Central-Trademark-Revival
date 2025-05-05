import React from "react";

import { ReviewsSectionData } from "@/contents/home-page";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { FaStar } from "react-icons/fa";
import { ImQuotesRight } from "react-icons/im";

export default function ReviewsSection() {
  return (
    <section className="w-full h-[590px] flex justify-center items-center">
      <div className="layout-standard flex justify-center items-center">
        <Carousel className="w-full mx-auto relative">
          <CarouselPrevious className="absolute text-gray-600 hover:text-primary-foreground max-md:hidden" />
          <CarouselNext className="text-gray-600 hover:text-primary-foreground max-md:hidden" />

          <CarouselContent className="flex">
            {ReviewsSectionData.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-1 w-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-3 text-center">
                  <Card>
                    <CardContent className="h-[380px] flex flex-col items-center justify-center px-5 space-y-8 rounded-md shadow-lg">
                      <div>
                        <ImQuotesRight className="text-4xl text-muted-hover" />
                      </div>
                      <p className="text-paragraph text-base">
                        {testimonial.feedback}
                      </p>
                      <div className="flex justify-center items-center space-x-3">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <FaStar
                              key={i}
                              className="text-yellow-400 text-sm"
                            />
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-10">
                    <h1 className="text-heading font-bold">
                      {testimonial.name}
                    </h1>
                    <p className="text-paragraph text-xs">
                      {testimonial.profession}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
