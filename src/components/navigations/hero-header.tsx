"use client";

import { useSession } from "next-auth/react";
import HeroSection from "./hero-section";
import { Navbar } from "./navbar";

export const HeroHeader = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div>
      {/* Section above the navbar */}
      <HeroSection user={user} />
      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default HeroHeader;
