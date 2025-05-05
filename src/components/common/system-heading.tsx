import React from "react";

import { SystemHeadingInterface } from "@/interfaces/common-interface";

const SystemHeading = ({ heading, subheading }: SystemHeadingInterface) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-lato md:text-4xl text-2xl text-secondary font-[900] leading-[120%]">
        {heading}
      </h1>
      <p className="md:text-base text-sm text-heading">{subheading}</p>
    </div>
  );
};

export default SystemHeading;
