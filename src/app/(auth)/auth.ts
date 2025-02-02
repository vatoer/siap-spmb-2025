import NextAuth, { NextAuthResult } from "next-auth";
import authConfig from "./auth.config";
// reference https://github.com/nextauthjs/next-auth/issues/10568

export const nextAuth = NextAuth({
  debug: true,
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});

export const {
  handlers: { GET, POST },
  signOut,
  auth,
} = nextAuth;

export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
