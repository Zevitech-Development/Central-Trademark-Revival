import React from "react";
import Image from "next/image";
import Link from "next/link";

import DotsLine from "@/components/partials/dots-line";

import WhyCentralTrademarkRevivalIcon01 from "../../../public/icons/why-central-trademark-revival-icon-01.png";
import WhyCentralTrademarkRevivalIcon02 from "../../../public/icons/why-central-trademark-revival-icon-02.png";
import WhyCentralTrademarkRevivalIcon03 from "../../../public/icons/why-central-trademark-revival-icon-03.png";

function WhyCentralTrademarkRevivalSection() {
  return (
    <section className="w-full lg:mb-[2rem] md:mb-[1rem] lg:mt-[3rem] md:mt-[1rem]">
      <div className="md:mb-16 mb-8 flex flex-col items-center gap-4">
        <h1 className="text-heading md:text-5xl text-3xl font-lato font-[900] text-center leading-[120%]">
          Why Choose <br className="max-md:hidden" /> Central{" "}
          <span className="text-secondary hover:text-heading  transition-all ease-in-out duration-200">
            Trademark
          </span>{" "}
          Revival?
        </h1>

        <DotsLine />
      </div>

      <div className="w-full grid lg:grid-cols-3 md:gap-12 gap-8 max-lg:text-center">
        <div className="grid grid-cols-1 md:gap-8 gap-4">
          <div className="flex items-center max-lg:justify-center gap-4">
            <Image
              src={WhyCentralTrademarkRevivalIcon01}
              alt="icon"
              className="md:w-[60px] w-[40px]"
            />
            <h1 className="md:text-2xl text-lg text-heading font-bold font-lato">
              Fast & Reliable Processing
            </h1>
          </div>

          <p className="md:text-base text-sm leading-relaxed">
            We prioritize speed and precision in handling your trademark
            revival, ensuring your application gets back on track without
            unnecessary delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:gap-8 gap-4">
          <div className="flex items-center max-lg:justify-center gap-4">
            <Image
              src={WhyCentralTrademarkRevivalIcon02}
              alt="icon"
              className="md:w-[50px] w-[40px]"
            />
            <h1 className="md:text-2xl text-lg text-heading font-bold font-lato">
              Expertise You Can Trust
            </h1>
          </div>

          <p className="md:text-base text-sm leading-relaxed">
            Our experienced professionals understand the nuances of trademark
            revival and work diligently to ensure your application gets back on
            track.
          </p>
        </div>

        <div className="grid grid-cols-1 md:gap-8 gap-4">
          <div className="flex items-center max-lg:justify-center gap-4">
            <Image
              src={WhyCentralTrademarkRevivalIcon03}
              alt="icon"
              className="md:w-[50px] w-[40px]"
            />
            <h1 className="md:text-2xl text-lg text-heading font-bold font-lato">
              Free Consultation
            </h1>
          </div>
          <p className="md:text-base text-sm leading-relaxed">
            Unsure about the process or eligibility for revival? Our team is
            here to offer free consultations, helping you understand your
            options and make informed decisions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyCentralTrademarkRevivalSection;
