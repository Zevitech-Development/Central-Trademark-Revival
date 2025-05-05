import React from "react";

import DotsLine from "@/components/partials/dots-line";

function WhatTrademarkRrevivalSection() {
  return (
    <section className="w-full md:mb-[2rem] md:mt-[1rem] text-center max-w-[1050px] mx-auto">
      <div className="mb-4 flex flex-col items-center gap-4">
        <h1 className="text-heading md:text-5xl text-3xl font-lato font-[900] text-center leading-[120%]">
          What is{" "}
          <span className="text-secondary hover:text-black  transition-all ease-in-out duration-200">
            Trademark
          </span>{" "}
          Revival?
        </h1>

        <DotsLine />
      </div>

      <p className="text-paragraph md:text-base text-sm leading-relaxed">
        Trademark revival is the process of reinstating a trademark application
        that has been declared dead or abandoned by the United States Patent and
        Trademark Office (USPTO). This may happen due to missed deadlines,
        incomplete responses, or other procedural errors. At Central Trademark
        Revival, we make the process straightforward, guiding you step by step
        to ensure compliance and timely submission.
      </p>
    </section>
  );
}

export default WhatTrademarkRrevivalSection;
