import { NextAuthOptions, Session as NextAuthSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session extends NextAuthSession {
  user: User;
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_KEY!,
    }),
  ],

  callbacks: {
   
    async jwt({ token, user, account }): Promise<JWT> {
   
      if (user) {
        try {
          const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
            }),
          });

          if (response.ok) {
            const existingUser = await response.json();

            if (existingUser && existingUser.id) {
              token.id = existingUser.id;
            } else {
             
              const registerResponse = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: user.email,
                  name: user.name,
                  image: user.image,
                }),
              });

              const newUser = await registerResponse.json();
              token.id = newUser.id;
            }
          }
        } catch (error) {
          console.error("Error during user validation:", error);
        }
      }

      return token;
    },

    async session({ session, token }): Promise<Session> {
      if (token.id && session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session as Session;
    },
  },
};