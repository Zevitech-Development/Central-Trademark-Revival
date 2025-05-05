import React from "react";

import HeroSection from "@/sections/home/hero-section";
import AboutSection from "@/sections/home/about-section";
import WhyCentralTrademarkRevivalSection from "@/sections/home/why-central-trademark-revival-section";
import WhatTrademarkRrevivalSection from "@/sections/home/what-trademark-revival-section";
import OurServicesSection from "@/sections/home/our-services-section";
import LegalTeamSection from "@/sections/home/legal-team-section";
import AchievementSection from "@/sections/home/achievement-section";
import ReviewsSection from "@/sections/home/reviews-section";

function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <div className="page-layout-standard">
        <WhyCentralTrademarkRevivalSection />
        <WhatTrademarkRrevivalSection />
        <OurServicesSection />
        <LegalTeamSection />
      </div>
      <AchievementSection />
      <ReviewsSection />
    </main>
  );
}

export default HomePage;
