"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, ExternalLink, Calendar } from "lucide-react";

const TalksPage = () => {
  return (
    <div>      
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
            Talks & Presentations
          </h1>
          <p className="text-gray-600 text-lg">
            Explore presentations and talks from the SE Education Toolkit team
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Talk Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-blue-700 mr-2" />
                <span className="text-gray-500">April 2025</span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-3">
                Integrating Large Language Models into Software Engineering Education
              </h2>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-700 mb-2">Conference Details</h3>
                <p className="mb-2">
                  Presented at <a 
                  href="https://2025.ieee-educon.org/program/educon-2025-program" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  >
                  <strong>IEEE EDUCON 2025</strong>
                  </a>
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Abstract</h3>
                <p className="text-gray-600">
                  This talk examines the integration of Large Language Models into software engineering education, 
                  addressing the current gap between industry adoption and educational integration of AI tools. 
                  We present our ongoing project on developing an open-source toolkit focusing on requirements 
                  engineering and UML design through interactive lab exercises and gamified approaches.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Key Topics</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>State of the art: AI in SE industry and education</li>
                  <li>The "User Story Wizard Game" for teaching requirements engineering</li>
                  <li>Platform comparison: Insights from experiments with different LLMs</li>
                  <li>Student feedback on the Requirements Engineering Detective Game</li>
                  <li>Persona-based prompt engineering for educational contexts</li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <a 
                  href="/slides/llm-se-education-educon2025.pdf" 
                  className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Download Slides
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🚀</span>
                <span className="text-lg font-bold">SE EDUCATION TOOLKIT</span>
              </div>
              <p className="text-gray-400 mt-1">Empowering software engineering educators</p>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
              <Link href="/" className="hover:text-blue-300">Home</Link>
              <Link href="/about" className="hover:text-blue-300">About</Link>
              <Link href="/talks" className="text-blue-300 font-medium">Talks</Link>
              <Link href="/contact" className="hover:text-blue-300">Contact</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} SE Education Toolkit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TalksPage;