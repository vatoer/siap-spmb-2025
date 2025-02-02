import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import MenuItems from "./menu-items";

export const MenuMobile = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild className="bg-primary border-0">
          <Button variant="outline">
            <Menu className="text-white text-2xl" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="bg-primary/90 text-white flex flex-col gap-4 border-0 shadow-lg"
        >
          <SheetHeader className="">
            <SheetTitle className="text-white text-2xl">Siap SPMB</SheetTitle>
          </SheetHeader>
          <MenuItems />
        </SheetContent>
      </Sheet>
    </div>
  );
};
