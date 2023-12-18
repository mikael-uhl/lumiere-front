"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";

type RequestOptions = {
  body?: any;
  method?: string;
  headers?: Record<string, string>;
  cache?: RequestCache;
};

async function getSession() {
  return await getServerSession(authOptions);
}

export async function authorizedFetch(
  url: string,
  options: RequestOptions = {},
) {
  const session = await getSession();
  const headers = new Headers();

  headers.append("Authorization", `Bearer ${session?.token}`);

  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers.append(key, value);
    });
  }

  const fetchUrl = `${process.env.API_URL}/${url}`;

  const response = await fetch(fetchUrl, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache || "default",
  });

  if (response.status == 401) {
    console.error("Token expirado!");
    return [];
  }

  if (options.method == "DELETE") {
    return [];
  }

  return response.json();
}
