"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FormRegister from "../../app/(auth)/buat-akun-baru/_components/form-register";

export const FormsContainer = () => {
  return (
    <>
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Membuat Akun Baru</h1>
        <p className="text-gray-500">
          Isi data-data berikut untuk membuat akun baru.
        </p>
      </div>
      <FormRegister />
      <div className=" mt-4">
        <Link
          href="/login"
          className={buttonVariants({
            variant: "link",
            className: "gap-1 w-full text-blue-500",
          })}
        >
          {`Sudah punya Akun? Login`}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </>
  );
};

export default FormsContainer;
