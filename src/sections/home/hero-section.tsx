import React from "react";

import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="bg-home-hero lg:h-[800px] h-[650px] w-full bg-cover bg-no-repeat">
      <div className="layout-standard h-full flex-center gap-8 text-center flex-col">
        <div className="space-y-2">
          <h2 className="font-lato md:text-2xl text-lg text-secondary font-semibold">
            Welcome to Central Trademark Revival®
          </h2>
          <h1 className="font-lato md:text-6xl text-3xl text-white font-[900] max-w-[700px] leading-[120%]">
            Don&apos;t Let Others Take What&apos;s Rightfully Yours
          </h1>
        </div>

        <p className="md:text-xl text-sm text-white max-w-[980px]">
          Don&apos;t let a dead or abandoned trademark application hold back
          your business. Central Trademark Revival® is here to guide you every
          step of the way. Making trademark revival simple and accessible, you
          can trust us to help you reclaim your brand.
        </p>

        <div className="max-md:w-full flex items-center gap-2 md:flex-row flex-col">
          <Button
            className="md:h-[55px] h-[45px] md:px-8 md:text-base text-sm w-full font-lato font-bold hover:bg-primary-hover"
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

          <Button className="md:h-[55px] h-[45px] md:px-8 md:text-base text-sm w-full font-lato font-bold bg-secondary hover:bg-secondary-hover">
            Revive Now <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
