"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Student testimonials data - anonymous quotes
const testimonials = [
  {
    id: 1,
    quote: "It was fun and engaging",
  },
  {
    id: 2,
    quote:
      "Significantly more interactive, paired with an interesting topic makes it fun to do",
  },
  {
    id: 3,
    quote: "I like the step-by-step guidance and immediate feedback",
  },
  {
    id: 4,
    quote:
      "It was quick to use and it didn't feel like I am bothering someone or asking stupid questions",
  },
  {
    id: 5,
    quote: "It was independent so I learnt more",
  },
  {
    id: 6,
    quote: "Quicker and easier to understand",
  },
  {
    id: 7,
    quote:
      "Interaction with LLMs make this exercise 'fun' and might encourage students to be intentional with their prompts and proof-read answers.",
  },
  {
    id: 8,
    quote:
      "The hands-on experience working directly conversing with an LLM model in the form of a game greatly streamlined the learning process and I thoroughly enjoyed it.",
  },
];

export default function TestimonialsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Create duplicate testimonials for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      ref={ref}
      className="py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/3 -left-16 w-32 h-32 bg-blue-200 rounded-full opacity-20" />
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-blue-200 rounded-full opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Student Experiences
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear what students have to say about their experiences with our
            AI-powered learning platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 0.8, delay: 0.3 },
            },
          }}
        >
          {/* Infinite scroll testimonials */}
          <div className="slider-container">
            <div className="testimonials-track flex gap-6">
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="min-w-[280px] md:min-w-[320px] lg:min-w-[380px] flex-shrink-0"
                >
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative h-full">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-3xl -z-10" />
                    <p className="text-gray-600 italic text-base leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="mt-4 text-right">
                      <p className="text-blue-500 text-sm">— Student</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
