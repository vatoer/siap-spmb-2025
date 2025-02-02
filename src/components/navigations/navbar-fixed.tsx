"use client";

import Link from "next/link";
import { UserButton } from "../user/user-button";
import Menu from "./menu";
import NavbarMenuMobile from "./navbar-menu-mobile";

export const Navbar = () => {
  return (
    <>
      <nav
        className={`fixed inset-y-0 z-50 opacity-90 bg-gray-50 text-gray-900 backdrop-blur h-[48px] w-full z-50 shadow-lg flex flex-row justify-between items-center px-2 `}
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

export default Navbar;
