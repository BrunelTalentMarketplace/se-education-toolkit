"use client";

import React from "react";
import Link from "next/link";

import FeaturesAnmol from "./FeaturesAnmol";
import Assessments from "./Assessments";
import PersonasPageAnmol from "./PersonasPageAnmol";

const LandingPageA: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Shape the Future of <br className="hidden sm:inline" />
            Software Engineering Education
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
            Open-source toolkit for SE education using Large Language Models
            with a focus on Requirements Engineering and UML design through
            interactive lab exercises with AI-powered feedback.
          </p>
          <Link
            href="/labs"
            className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-900 font-medium px-5 sm:px-6 py-2 sm:py-3 rounded-md shadow-sm transition-transform hover:scale-105 hover:shadow-lg"
          >
            Explore Labs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPageA;
