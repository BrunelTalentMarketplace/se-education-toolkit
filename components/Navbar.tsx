"use client";

import { NavlinkType, NAVLINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="flex px-10 py-4 justify-between items-center relative shadow-sm">
      {/* Logo */}
      <button
        onClick={() => router.push("/")}
        className="rounded-full w-14 aspect-square hover:scale-105 transition-transform"
      >
        <Image
          className="rounded-full"
          src={
            "https://bruneltalentmarketplace.com/static/media/Navbar-icon.9b1893f0b90313489b9f.png"
          }
          alt="btm logo"
          width={200}
          height={200}
        />
      </button>

      {/* Navigation Links */}
      <div className="flex gap-8 items-center">
        {NAVLINKS.map((navlink) => (
          <Navlink key={navlink.name} navlink={navlink} />
        ))}
      </div>
    </nav>
  );
};

const Navlink = ({ navlink: { name, href } }: { navlink: NavlinkType }) => {
  return (
    <Link href={href} className="group">
      <div className="relative py-2">
        <p className="text-base font-medium text-gray-700 group-hover:text-[#FF9933] transition-colors">
          {name}
        </p>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF9933] group-hover:w-full transition-all duration-300 ease-in-out"></span>
      </div>
    </Link>
  );
};

export default Navbar;
