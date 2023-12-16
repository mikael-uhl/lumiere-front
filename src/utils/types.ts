import { UUID } from "crypto";

export type ContentItem = {
  item_id: UUID;
  title: string;
  original_title: string;
  year: number;
  genre: string;
  completed: boolean;
  list_id: UUID;
  queue_id: UUID;
};

export type ContentList = {
  list_id: UUID;
  list_name: string;
  group_id: UUID;
  ContentItems: ContentItem[];
};

export type ContentQueue = {
  queue_id: UUID;
  group_id: UUID;
  ContentItems: ContentItem[];
};

export type Group = {
  group_id: UUID;
  group_name: string;
  GroupMember: {
    member_id: UUID;
    permissions: "read" | "read-write";
    user_id: UUID;
    group_id: UUID;
  };
  ContentLists: ContentList[];
  ContentQueue: ContentQueue;
  Users: User[];
};

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

export type NavLink = {
  displayName: string;
  path: string;
};
