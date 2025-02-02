import HeroHeader from "@/components/navigations/hero-header";
import { SessionProvider } from "next-auth/react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <SessionProvider>
          <HeroHeader />
        </SessionProvider>
      </header>
      <main className="bg-gradient-to-br from-gray-100 to-gray-200 flex min-h-screen flex-col items-center justify-between mt-[48px] px-10">
        {children}
      </main>

      <footer>{/* Footer content goes here */}</footer>
    </div>
  );
};

export default PublicLayout;
