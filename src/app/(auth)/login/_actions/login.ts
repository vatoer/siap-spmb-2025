"use server";
import * as z from "zod";

import { signIn } from "@/app/(auth)/auth";
import { LoginSchema } from "@/zod/schema/login";
import { AuthError } from "next-auth";
type TLogin = z.infer<typeof LoginSchema>;

const DEFAULT_ROUTE_AFTER_LOGIN = "/";

export const login = async (data: TLogin) => {
  console.log(data);
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid data", data: validateFields.error };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_ROUTE_AFTER_LOGIN,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          console.log(error);
          return { error: "Invalid credentials" };
        }
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
