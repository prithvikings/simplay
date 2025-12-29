import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeroCard from "./components/HeroCard";
import HowdoI from "./components/HowdoI";
import WhyNotYouTube from "./components/WhyNotYouTube";
import BuiltForLearners from "./components/BuiltForLearners";
import WhoIsThisFor from "./components/WhoIsThisFor";
import Trust from "./components/Trust";
import FinalCTA from "./components/FinalCTA";
const LandingPage = () => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen ">
      <div className="max-w-5xl mx-auto">
        <Navbar />
        <Hero />
        <HeroCard />
        <HowdoI />
        <WhyNotYouTube />
        <BuiltForLearners />
        <WhoIsThisFor />
        <Trust />
        <FinalCTA />
      </div>
    </div>
  );
};

export default LandingPage;
