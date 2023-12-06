import { UUID } from "crypto";

export type User = {
  user_id: UUID;
  first_name: String;
  last_name: String;
  username: String;
  email: String;
  date_of_birth: String;
  phone_number: String;
  profile_image_url: String;
  bio: String;
};
