"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";

import Link from "next/link";
import UserButtonDropdown from "./user-button-dropdown";

export const UserButton = () => {
  const { data: session } = useSession();

  const user = session?.user;

  if (!user) {
    return <UserButton.Login />;
  }

  return <UserButtonDropdown user={user} />;
};

UserButton.Login = function UserButtonLogin() {
  return (
    <Button variant={"ghost"}>
      <Link href="/login" className="flex items-center gap-x-2 rounded-md">
        <User size={16} />
        <span>Login</span>
      </Link>
    </Button>
  );
};

UserButton.Skeleton = function UserButtonSkeleton() {
  return (
    <div className="flex items-center gap-x-2">
      <Skeleton className="w-16 h-16 rounded-full" />
    </div>
  );
};
