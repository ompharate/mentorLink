import { Account, ISODateString, NextAuthOptions, Session as NextAuthSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { GOOGLE_LOGIN_URL, EMAIL_LOGIN_URL } from "@/lib/apiAuthRoutes";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_KEY!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(EMAIL_LOGIN_URL, {
            email: credentials?.email,
            password: credentials?.password,
          });
          
          if (data?.user?.id && data?.user?.token) {
            return {
              id: data.user.id.toString(),
              name: data.user.name,
              email: data.user.email,
              image: data.user.image,
              token: data.user.token,
            };
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error("Invalid credentials");
          } else {
            throw new Error("Something went wrong");
          }
        }
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        if (account?.provider === "google") {
          const payload = {
            email: user.email!,
            name: user.name!,
            oauth_id: account?.providerAccountId!,
            provider: account?.provider!,
            image: user?.image,
          };
          const { data } = await axios.post(GOOGLE_LOGIN_URL, payload);
          user.id = data?.user?.id?.toString();
          user.token = data?.user?.token;
          return true;
        } else {
          user.id = user?.id?.toString();
          user.token = user?.token;
          return true;
        }
      } catch (error) {
        throw new Error("User not found");
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
};
