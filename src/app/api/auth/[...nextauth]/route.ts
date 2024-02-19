import { UUID } from "crypto";
import dayjs from "dayjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const tokenExpirationTime = 24 * 60 * 60;

async function refreshAccessToken(token: {
  refreshToken: { refresh_token_id: UUID };
}) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        refreshTokenId: token.refreshToken.refresh_token_id,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return refreshedTokens;
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await response.json();

        if (user && response.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);

      if (dayjs().isAfter(dayjs.unix(token.user.user.expirationTime))) {
        token.user = await refreshAccessToken(token.user);
      }
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: tokenExpirationTime,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
