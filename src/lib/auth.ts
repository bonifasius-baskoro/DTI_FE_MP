// lib/auth.ts
import NextAuth, { User } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { LoginResponse, TokenClaims } from "@/types/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" 
            ,maxAge: 60 * 60 * 10 },


  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email",type:"text" },
        password: { label: "password",type:"password" }
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) return null;
        
        const { data } = (await response.json()) as LoginResponse;

        const claims = jwtDecode<TokenClaims>(data.accessToken);
        const {  scope, userId } = claims;
        const parsedResponse: User = {
            id:userId.toString(),
            token: {
              accessToken: {
                claims: claims,
                value: data.accessToken,
              },
            },
            roles: scope,
            userId: parseInt(userId)
          };
          return parsedResponse ?? null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
        session.accessToken = token.accessToken.value;
        session.user = {
          ...session.user,
          scope: token.roles,
          userId: token.accessToken.claims.userId,
          email: token.accessToken.claims.sub ?? "",
          name: token.accessToken.claims.name
        };
        return session;
      },
      async jwt({ token, user }) {
        console.log("IN JWT CALLBACK: ", user);
        if (user) {
          token = {
            accessToken: {
              claims: user.token.accessToken.claims,
              value: user.token.accessToken.value,
            },
            roles: user.roles,
            userId: user.userId,
          };
        }
        return token;
      },
  }
});

