"use client";

import React from "react";
import CountUp from "react-countup";

import { PlusIcon } from "lucide-react";

function AchievementSection() {
  return (
    <section className="w-full lg:h-[300px] max-lg:py-12 flex-center bg-achievement-section-hero mt-8">
      <div className="layout-standard grid lg:grid-cols-4 gap-7">
        <div className="text-center space-y-2">
          <div className="flex justify-center items-start gap-2">
            <div className="w-[6px] h-[26px] bg-secondary-foreground mr-3 max-md:hidden"></div>
            <h1 className="text-5xl font-extrabold text-secondary-foreground font-lato">
              <CountUp end={165} />
            </h1>
            <PlusIcon className="text-secondary-foreground" />
          </div>
          <p className="text-muted">Active Attorneys</p>
        </div>

        <div className="text-center space-y-2">
          <div className="flex justify-center items-start gap-2">
            <div className="w-[6px] h-[26px] bg-secondary-foreground mr-3 max-md:hidden"></div>
            <h1 className="text-5xl font-extrabold text-secondary-foreground font-lato">
              <CountUp end={254} />
            </h1>
            <PlusIcon className="text-secondary-foreground" />
          </div>
          <p className="text-muted">Successful Cases</p>
        </div>

        <div className="text-center space-y-2">
          <div className="flex justify-center items-start gap-2">
            <div className="w-[6px] h-[26px] bg-secondary-foreground mr-3 max-md:hidden"></div>
            <h1 className="text-5xl font-extrabold text-secondary-foreground font-lato">
              <CountUp end={2} />M
            </h1>
            <PlusIcon className="text-secondary-foreground" />
          </div>
          <p className="text-muted">Cost for clients</p>
        </div>

        <div className="text-center space-y-2">
          <div className="flex justify-center items-start gap-2">
            <div className="w-[6px] h-[26px] bg-secondary-foreground mr-3 max-md:hidden"></div>
            <h1 className="text-5xl font-extrabold text-secondary-foreground font-lato">
              <CountUp end={145} />
            </h1>
            <PlusIcon className="text-secondary-foreground" />
          </div>
          <p className="text-muted">Happy Clients </p>
        </div>
      </div>
    </section>
  );
}

export default AchievementSection;
