import { PrismaAdapter } from "@auth/prisma-adapter";
import { clsx, type ClassValue } from "clsx";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./prisma";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    session({ session, user }) {
      const { role = "admin" } = user as unknown as { role: string };
      const newSession: any = { ...session };
      newSession.user.id = user.id;
      newSession.user.role = role;
      return newSession;
    },
    redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },
};

export async function createSession(userId: string) {
  const addDays = (date: Date, days: number) => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  };
  const sessionToken = uuidv4();
  const expires = addDays(new Date(), 7);

  const session = await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
    },
  });

  return session;
}
