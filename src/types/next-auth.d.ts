import { UUID } from "crypto";
// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth/next";
// eslint-disable-next-line no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      user_id: UUID;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      date_of_birth: string;
      phone_number: string;
      profile_image_url: string;
      bio: string;
    };
    token: string;
    error?: "RefreshAccessTokenError";
  }

  // eslint-disable-next-line no-unused-vars
  interface User {
    token: String;
    user: {
      user_id: UUID;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      date_of_birth: string;
      phone_number: string;
      profile_image_url: string;
      bio: string;
      expirationTime: number;
    };
    refreshToken: {
      refresh_token_id: UUID;
      user_id: UUID;
      expires_in: number;
    };
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    user: {
      token: String;
      user: {
        user_id: UUID;
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        date_of_birth: string;
        phone_number: string;
        profile_image_url: string;
        bio: string;
        expirationTime: number;
      };
      refreshToken: {
        refresh_token_id: UUID;
        user_id: UUID;
        expires_in: number;
      };
      error?: "RefreshAccessTokenError";
    };
  }
}
