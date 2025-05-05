import React from "react";

import DotsLine from "@/components/partials/dots-line";

import {
  FolderKanban,
  Headset,
  MessageSquareReply,
  ScanSearch,
  Shield,
  Users,
} from "lucide-react";

function OurServicesSection() {
  return (
    <section className="w-full text-center lg:mb-[2rem] md:mb-[1rem]">
      <div className="flex flex-col items-center gap-4 mb-8">
        <h1 className="text-heading md:text-5xl text-3xl font-lato font-[900] text-center leading-[120%]">
          Our{" "}
          <span className="text-secondary hover:text-heading transition-all ease-in-out duration-200">
            Services
          </span>
        </h1>

        <DotsLine />
      </div>

      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="border rounded-md px-4 flex flex-col gap-2 items-center justify-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary flex-center text-white mb-4">
            <Users size={34} />
          </div>

          <h1 className="text-heading text-lg font-lato font-bold">
            Free Trademark Revival Consultation
          </h1>

          <p className="text-paragraph text-sm leading-relaxed">
            Schedule a no-obligation consultation with our trademark experts to
            evaluate your case, understand the reason for abandonment, and
            explore the best path to revival.
          </p>
        </div>

        <div className="border rounded-md px-4 flex flex-col gap-2 items-center justify-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary flex-center text-white mb-4">
            <ScanSearch size={34} />
          </div>

          <h1 className="text-heading text-lg font-lato font-bold">
            Trademark Application Review
          </h1>

          <p className="text-paragraph text-sm leading-relaxed">
            We thoroughly examine your initial trademark application to
            determine the reason for abandonment and create a tailored strategy
            to move forward with the revival process.
          </p>
        </div>

        <div className="border rounded-md px-4 flex flex-col gap-2 items-center justify-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary flex-center text-white mb-4">
            <FolderKanban size={34} />
          </div>

          <h1 className="text-heading text-lg font-lato font-bold">
            USPTO Correspondence Management
          </h1>

          <p className="text-paragraph text-sm leading-relaxed">
            We take charge of all communications with the USPTO to ensure your
            trademark revival is smooth, timely, and in full compliance with
            procedural requirements.
          </p>
        </div>

        <div className="border rounded-md px-4 flex flex-col gap-2 items-center justify-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary flex-center text-white mb-4">
            <Shield size={34} />
          </div>

          <h1 className="text-heading text-lg font-lato font-bold">
            Filing Petitions for Trademark Revival
          </h1>

          <p className="text-paragraph text-sm leading-relaxed">
            Our team prepares and files the required petitions and supporting
            documents with the USPTO, including the mandatory $350 federal fee
            per classification.
          </p>
        </div>

        <div className="border rounded-md px-4 flex flex-col gap-2 items-center justify-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary flex-center text-white mb-4">
            <MessageSquareReply size={34} />
          </div>

          <h1 className="text-heading text-lg font-lato font-bold">
            Response to Office Actions
          </h1>

          <p className="text-paragraph text-sm leading-relaxed">
            We draft and submit detailed responses to Office Actions issued by
            the USPTO, addressing refusals or objections to help secure the
            successful revival of your trademark.
          </p>
        </div>

        <div className="border rounded-md px-4 flex flex-col gap-2 items-center justify-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary flex-center text-white mb-4">
            <Headset size={34} />
          </div>

          <h1 className="text-heading text-lg font-lato font-bold">
            Ongoing Support
          </h1>

          <p className="text-paragraph text-sm leading-relaxed">
            After revival, we offer continued support to help you maintain your
            trademark, ensuring long-term protection and compliance with USPTO
            requirements.
          </p>
        </div>
      </div>
    </section>
  );
}

export default OurServicesSection;
