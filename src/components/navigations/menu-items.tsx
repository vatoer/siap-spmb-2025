import Link from "next/link";

export const MenuItems = () => {
  return (
    <div className="hidden lg:relative w-full lg:flex lg:flex-row gap-6">
      <Link href="/" className="transition-colors hover:underline">
        Panduan
      </Link>
      <Link href="/" className="transition-colors hover:underline">
        Aturan
      </Link>
      <Link href="/" className="transition-colors hover:underline">
        Alur Pendaftaran
      </Link>
      <Link href="/" className="transition-colors hover:underline">
        Jadwal
      </Link>
      <Link href="/" className="transition-colors hover:underline">
        Daya Tampung
      </Link>
      <Link href="/" className="transition-colors hover:underline">
        Seleksi
      </Link>
    </div>
  );
};

export default MenuItems;
