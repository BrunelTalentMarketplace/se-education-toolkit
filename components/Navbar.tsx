"use client";

import { NavlinkType, NAVLINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import Assessments from "./Assessments";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="bg-blue-700 py-4 px-6 shadow text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 text-xl font-bold">
          {/* Spiral Logo (external) */}
          <Image
            onClick={() => router.push("/")}
            src="https://bruneltalentmarketplace.com/static/media/Navbar-icon.9b1893f0b90313489b9f.png"
            alt="Spiral Logo"
            width={40}
            height={40}
            className="rounded-full hover:cursor-pointer"
          />
          <span className="flex items-center">
            <span className="text-2xl mr-2">🚀</span> SE EDUCATION TOOLKIT
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6 text-white font-medium">
            <li>
              <a href="#features" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#personas" className="hover:underline">
                Personas
              </a>
            </li>
            <li>
              <a href="/labs" className="hover:underline">
                Labs
              </a>
            </li>

            <li>
              <a href="#assessments" className="hover:underline">
                Assessment
              </a>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
