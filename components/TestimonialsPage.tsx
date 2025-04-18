"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Student testimonials data
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Computer Science Student",
    quote:
      "The interactive AI tutor was incredibly helpful for understanding complex UML concepts. It felt like having a personal tutor available 24/7!",
    avatar: "/students/student1.jpg",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Software Engineering Student",
    quote:
      "I loved how the system provided immediate feedback on my requirements documents. It helped me identify ambiguities and inconsistencies I wouldn't have caught on my own.",
    avatar: "/students/student2.jpg",
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Business Computing Student",
    quote:
      "The persona-based exercises made requirements engineering much more engaging. I could actually see how different stakeholders would view the same system.",
    avatar: "/students/student3.jpg",
  },
  {
    id: 4,
    name: "Sofia Rodriguez",
    role: "Computer Science Student",
    quote:
      "As someone who struggles with technical writing, the AI feedback on my requirements was game-changing. I've seen real improvement in my documentation skills.",
    avatar: "/students/student4.jpg",
  },
  {
    id: 5,
    name: "Jordan Taylor",
    role: "Business Computing Student",
    quote:
      "The labs helped me bridge the gap between theory and practice. I now feel much more confident in my ability to create UML diagrams for real-world scenarios.",
    avatar: "/students/student5.jpg",
  },
];

export default function TestimonialsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const visibleTestimonials = () => {
    if (isMobile) return [testimonials[currentIndex]];
    return [
      testimonials[currentIndex],
      testimonials[(currentIndex + 1) % testimonials.length],
      testimonials[(currentIndex + 2) % testimonials.length],
    ];
  };

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
          className="text-center mb-16"
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
          className="relative"
        >
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div
            className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-6`}
          >
            {visibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.2 + index * 0.1 },
                  },
                }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-3xl -z-10" />
                <div className="mb-4 relative h-16 w-16">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    layout="fill"
                    className="rounded-full object-cover border-2 border-blue-100"
                  />
                </div>
                <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                <div className="mt-auto">
                  <h3 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-blue-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full mx-1 ${
                  Math.floor(currentIndex / (isMobile ? 1 : 3)) ===
                  Math.floor(index / (isMobile ? 1 : 3))
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
