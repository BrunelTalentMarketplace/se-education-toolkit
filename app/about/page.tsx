"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Check, ExternalLink } from "lucide-react";

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <main
      ref={ref}
      className="min-h-screen flex flex-col relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white" />
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-blue-500/10" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-500/10" />
        <div className="absolute top-40 right-1/4 w-20 h-20 rounded-full bg-blue-500/10" />
      </div>

      {/* Hero section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.1 },
              },
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                About the Project
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              An educational project exploring how Large Language Models can
              enhance software engineering education
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === "overview"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === "team"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("team")}
            >
              Team
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-10 px-4 flex-1">
        <div className="max-w-5xl mx-auto">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Project Overview
                </h2>
                <p className="text-gray-600 mb-6">
                  This project was developed as part of a research initiative at
                  Brunel University London to explore how Large Language Models
                  (LLMs) can be integrated into software engineering education.
                  Our platform offers interactive, AI-powered lab exercises
                  focused on requirements engineering and UML design.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">
                      Benefits for Students
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check
                          size={20}
                          className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">
                          Immediate, personalized feedback
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={20}
                          className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">
                          Interactive learning experiences
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={20}
                          className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">
                          Learn without fear of judgment
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={20}
                          className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">
                          Practice at your own pace
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 text-gray-800">
                      Benefits for Educators
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check
                          size={20}
                          className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">
                          Scalable teaching solutions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={20}
                          className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">
                          Reduced grading workload
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={20}
                          className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">
                          Insights into student learning patterns
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check
                          size={20}
                          className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600">
                          Focus on higher-level teaching activities
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Funding
                </h2>
                <p className="text-gray-600 mb-6">
                  This project is funded by the Council of Professors and Heads
                  of Computing (CPHC) Special Projects grant.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Research Team
                </h2>
                <p className="text-gray-600 mb-6">
                  This project was developed by researchers at Brunel University
                  London, combining expertise in software engineering,
                  education, and artificial intelligence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-full mb-4 overflow-hidden relative">
                      <Image
                        src="https://static.wixstatic.com/media/31cbd6_6e99d94e057f40779df469fd471f4a64~mv2.jpg/v1/fill/w_385,h_380,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Profile_Image1.jpg"
                        alt="Team member"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      Dr. Cigdem Sengul
                    </h3>
                    <p className="text-blue-500">Brunel University London</p>
                    <p className="text-gray-600 mt-2">
                      <a
                        href="mailto:cigdem.sengul@brunel.ac.uk"
                        className="text-blue-500 hover:underline"
                      >
                        cigdem.sengul@brunel.ac.uk
                      </a>
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-full mb-4 overflow-hidden relative">
                      <Image
                        src="https://media.licdn.com/dms/image/v2/C4D03AQFsc1lq5CR_vA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516587953912?e=2147483647&v=beta&t=zVnsI9K4A00tPOxNcFA7QMQng5JFQ_X5nOOQPnnCfmQ"
                        alt="Team member"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      Dr. Rumyana Neykova
                    </h3>
                    <p className="text-blue-500">Brunel University London</p>
                    <p className="text-gray-600 mt-2">
                      <a
                        href="mailto:rumyana.neykova@brunel.ac.uk"
                        className="text-blue-500 hover:underline"
                      >
                        rumyana.neykova@brunel.ac.uk
                      </a>
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 bg-blue-100 rounded-full mb-4 overflow-hidden relative">
                      <Image
                        src="https://media.licdn.com/dms/image/v2/D4E03AQEtb9hrPjv1_g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1677749834673?e=2147483647&v=beta&t=yrxtkyibPkbjrU3Rp76opoWgn_5Oh7RsKhUdtsLY64I"
                        alt="Team member"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      Dr. Giuseppe Destefanis
                    </h3>
                    <p className="text-blue-500">Brunel University London</p>
                    <p className="text-gray-600 mt-2">
                      <a
                        href="mailto:giuseppe.destefanis@brunel.ac.uk"
                        className="text-blue-500 hover:underline"
                      >
                        giuseppe.destefanis@brunel.ac.uk
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our interactive labs and experience the future of software
            engineering education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/labs"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              <span>Explore Labs</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <a
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-blue-700 text-white rounded-full font-medium hover:bg-blue-800 transition-colors"
            >
              <span>View on GitHub</span>
              <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
