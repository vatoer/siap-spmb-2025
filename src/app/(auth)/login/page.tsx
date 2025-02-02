import { Suspense } from "react";
import CardBanner from "../_components/card-banner";
import LoginForm from "./_components/login-form";
const LoginPage = () => {
  return (
    <div className="flex flex-row gap-4 w-full min-h-svh justify-center pt-[48px] pb-[48px] bg-background">
      <div
        id="formulir"
        className="w-full max-w-sm h-min-[600px] border border-gray-200 p-4 mt-16 rounded-lg shadow-md"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
      <div
        id="formulir"
        className="hidden lg:block max-w-1/2 h-full border  mt-16 rounded-lg"
      >
        <CardBanner />
      </div>
    </div>
  );
};

export default LoginPage;
