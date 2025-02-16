import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";  // ใช้ PrismaAdapter จาก @next-auth

declare module "next-auth" {
  interface User {
    id: string;
    role: string;  // เพิ่ม role
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    role: string;
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,  // ส่ง role ไปใน session
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),  // ใช้ PrismaAdapter จาก @next-auth
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // อายุของ session
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;  // ส่ง role เข้าใน JWT
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;  // ส่ง role เข้าใน session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
