"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const testimonials = [
  "It's quick and easy to get help",
  "It was fun and engaging",
  "Significantly more interactive, paired with an interesting topic makes it fun to do",
  "I like the step-by-step guidance and immediate feedback",
  "It was quick to use and it didn't feel like I am bothering someone or asking stupid questions",
  "It was independent so I learnt more",
  "Quicker and easier to understand",
  "Interaction with LLMs make this exercise 'fun' and might encourage students to be intentional with their prompts and proof-read answers.",
  "The hands-on experience working directly conversing with an LLM model in the form of a game greatly streamlined the learning process and I thoroughly enjoyed it.",
];

const TestimonialsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={ref} id="testimonials" className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            <span className="bg-gradient-to-r from-[#FF7733] via-[#FF9933] to-[#FFBB33] bg-clip-text text-transparent">
              What Our Students Are Saying
            </span>
          </h2>
          <p className="text-center text-gray-600 mt-3 mb-8">
            Anonymous feedback from students who've used our platform
          </p>
        </motion.div>

        <div className="relative">
          {/* Gradient overlays for smooth scroll ending */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          <div className="overflow-hidden py-8">
            <div className="flex gap-6 slider-container">
              {/* First set of testimonials */}
              <div className="inline-flex gap-6 testimonials-track animate-scroll">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`a-${index}`}
                    className="min-w-[300px] max-w-[400px] p-6 rounded-lg bg-white border border-gray-100 flex flex-col"
                  >
                    <div className="flex-1">
                      <p className="italic text-gray-700">"{testimonial}"</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className="h-1 w-12 bg-[#FF9933] rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duplicate set for seamless looping */}
              <div className="inline-flex gap-6 testimonials-track animate-scroll">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`b-${index}`}
                    className="min-w-[300px] max-w-[400px] p-6 rounded-lg bg-white border border-gray-100 flex flex-col"
                  >
                    <div className="flex-1">
                      <p className="italic text-gray-700">"{testimonial}"</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className="h-1 w-12 bg-[#FF9933] rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
