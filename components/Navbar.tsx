"use client";

import { NavlinkType, NAVLINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex px-10 py-3 justify-between items-center relative">
      {/* Logo */}
      <div className="rounded-full w-12 aspect-square">
        <Image
          className="rounded-full"
          src={
            "https://bruneltalentmarketplace.com/static/media/Navbar-icon.9b1893f0b90313489b9f.png"
          }
          alt="btm logo"
          width={200}
          height={200}
        />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-12 items-center">
        {NAVLINKS.map((navlink) => (
          <Navlink key={navlink.name} navlink={navlink} />
        ))}
      </div>
      {/* Login and Sign Up */}
      <div className="flex gap-2">
        <button className="text-black px-4 rounded-md text-sm py-2">
          Sign Up
        </button>
        <button className="bg-black text-white px-6 rounded-md text-sm py-1">
          Login
        </button>
      </div>
    </nav>
  );
};

const Navlink = ({ navlink: { name, href } }: { navlink: NavlinkType }) => {
  return (
    <Link href={href}>
      <p className="text-xs text-black/60 font-medium">{name}</p>
    </Link>
  );
};

export default Navbar;
