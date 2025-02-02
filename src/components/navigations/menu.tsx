"use client";
import MenuItems from "./menu-items";

export const Menu = () => {
  return (
    <div className="hidden lg:relative w-full lg:flex lg:flex-row gap-6 text-gray-900">
      <MenuItems />
    </div>
  );
};

export default Menu;
