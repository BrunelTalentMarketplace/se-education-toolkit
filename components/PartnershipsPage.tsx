"use client";

import React, { useState } from "react";

const Partnership = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="w-full bg-gradient-to-b from-blue-100 to-blue-200 py-20 px-4"
      id="partners"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        {/* Gradient Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
          Looking for Partners!
        </h2>

        {/* Info Box */}
        <div className="bg-white text-gray-700 px-8 py-6 rounded-xl shadow-md max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
          Join our research by implementing the toolkit at your institution.
          Help us evaluate the effectiveness of LLMs in Software Engineering
          education and shape the future of teaching these critical skills.
        </div>

        {/* Contact Button */}
        <button
        
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Contact Us
        </button>

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl text-center w-80">
              <h3 className="text-lg font-bold mb-4">📬 Contact Us</h3>
              <p className="text-gray-700 mb-2">
                Rumyana Neykova:{" "}
                <a
                  href="mailto:rumyana.neykova@brunel.ac.uk"
                  className="text-blue-600 underline"
                >
                  rumyana.neykova@brunel.ac.uk
                </a>
              </p>
              <p className="text-gray-700 mb-4">
                Cigdem Sengul:{" "}
                <a
                  href="mailto:cigdem.sengul@brunel.ac.uk"
                  className="text-blue-600 underline"
                >
                  cigdem.sengul@brunel.ac.uk
                </a>
              </p>

              <p className="text-gray-700 mb-4">
              Giuseppe Destefanis:{" "}
                <a
                  href="mailto:giuseppe.destefanis@brunel.ac.uk"
                  className="text-blue-600 underline"
                >
                  giuseppe.destefanis@brunel.ac.uk
                </a>
              </p>


              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partnership;
