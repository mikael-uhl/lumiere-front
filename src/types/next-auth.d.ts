import { UUID } from "crypto";
// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth/next";

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
  }
}
