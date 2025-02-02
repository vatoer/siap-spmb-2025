"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UserButton } from "../user/user-button";
import Menu from "./menu";
import NavbarMenuMobile from "./navbar-menu-mobile";

export const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null); // Reference to the navbar
  const [isSticky, setIsSticky] = useState(false); // State to track sticky status

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsSticky(window.scrollY > navbarTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        ref={navbarRef}
        className={`bg-gray-50 text-gray-900 backdrop-blur h-[48px] w-full z-50 shadow-lg flex flex-row justify-between items-center px-2 ${
          isSticky ? "fixed inset-y-0 z-50 opacity-90" : ""
        }`}
      >
        <div className="flex flex-row gap-2">
          {/* <MenuMobile /> */}
          <div className="flex items-center">
            <Link href="/" className="whitespace-nowrap">
              <span>Siap SPMB</span>
            </Link>
          </div>
          <Menu />
        </div>

        <UserButton />
      </nav>
      <NavbarMenuMobile />
    </>
  );
};
