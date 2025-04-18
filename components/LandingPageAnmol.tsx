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
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          Shape the Future of <br className="hidden sm:inline" />
          Software Engineering Education
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-10">
          Open-source toolkit for SE education using Large Language Models with a focus on Requirements Engineering and UML design through interactive lab exercises with AI-powered feedback.
        </p>
        <Link
  href="/labs"
  className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-900 font-medium px-6 py-3 rounded-md shadow-sm transition"
>
  Explore Labs
</Link>
      </section>
    </div>
  );
};

export default LandingPageA;
