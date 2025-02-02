import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  user?: User;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  return (
    <div
      className="relative  bg-gradient-to-r from-red-400 via-blue-400 to-gray-400 h-[300px] "
      // style={{ backgroundImage: "url('/banner-anak-sekolah.png')" }}
    >
      {/* Image placed on top of the gradient */}
      <Image
        src="/banner-anak-sekolah.png"
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-green-100 bg-opacity-10"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white gap-2">
        <h1 className="md:text-3xl font-bold drop-shadow-lg bg-gray-100 text-gray-900 p-2 rounded-md">
          Penerimaan Murid Baru
        </h1>

        <h1 className="md:text-lg font-bold drop-shadow-lg bg-gray-100 text-gray-800 p-1 rounded-md">
          Tahun Pelajaran 2025 / 2026
        </h1>
        <CallToAction user={user} />
      </div>
    </div>
  );
};

interface CallToActionProps {
  user?: User;
}

const CallToAction = ({ user }: CallToActionProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-6">
      {!user && (
        <>
          <Link href="/buat-akun-baru#formulir">
            <Button
              size={"lg"}
              className="md:text-4xl font-bold md:p-6 bg-blue-700"
            >
              Buat Akun Sekarang
            </Button>
          </Link>
          <Button
            size={"lg"}
            className="md:text-4xl font-bold md:p-6 bg-blue-600"
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default HeroSection;
