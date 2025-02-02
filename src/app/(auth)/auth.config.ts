import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "@/data/auth/user";
import { verifyPassword } from "@/utils/hashing/pbkdf2";
import { LoginSchema } from "@/zod/schema/login";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const isPasswordMatch = await verifyPassword(password, user.password);
          if (!isPasswordMatch) {
            return null;
          }

          //return user;
          return {
            ...user,
          };
        }

        return null;
      },
    }),
    Google,
  ],
} satisfies NextAuthConfig;
