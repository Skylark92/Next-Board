import NextAuth from "next-auth/next";
import { User } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
  }
}

declare module "next-auth" {
  interface User {
    id?: string;
  }
}
