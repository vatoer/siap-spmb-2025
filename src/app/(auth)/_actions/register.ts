"use server";

import { getPrismaErrorResponse } from "@/actions/prisma-error-response";
import { login } from "@/app/(auth)/login/_actions/login";
import { userCreate } from "@/data/auth/user";
import { ActionResponse } from "@/types/response";
import { TRegister } from "@/zod/schema/register";
import { User } from "@prisma/client";

export const register = async (
  data: TRegister
): Promise<ActionResponse<string> | void> => {
  // create user
  let newUser: User;
  try {
    newUser = await userCreate(data);
  } catch (error) {
    return getPrismaErrorResponse(error);
  }

  try {
    if (!newUser) {
      return {
        success: false,
        error: "ER-REG-002",
        message: "Error creating user",
      };
    }

    const loginResponse = await login({
      email: data.email,
      password: data.password,
    });

    if (loginResponse?.error) {
      return {
        success: false,
        error: "ER-REG-003",
        message: "Error logging in user",
      };
    }
    return {
      success: true,
      data: "User created",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "ER-SIGNIN-002",
      message: "Error logging in user",
    };
  }
};
