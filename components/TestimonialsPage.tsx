import React from "react";

const TestimonialsPage = () => {
  return (
    <section id="testimonials" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          What Educators Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <p className="italic text-gray-600 mb-4">
              "This platform has transformed how I teach software engineering
              concepts. Students grasp complex ideas faster with the interactive
              approach."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                JS
              </div>
              <div className="ml-3">
                <p className="font-medium">Dr. Jane Smith</p>
                <p className="text-xs text-gray-500">
                  Professor, Computer Science
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <p className="italic text-gray-600 mb-4">
              "The AI-powered feedback allows me to focus on complex concepts
              while ensuring all students get personalized guidance."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                MJ
              </div>
              <div className="ml-3">
                <p className="font-medium">Prof. Michael Johnson</p>
                <p className="text-xs text-gray-500">
                  Department Chair, Software Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
