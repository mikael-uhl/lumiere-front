"use server";

export async function searchMediaByQuery(
  query: string,
  mediaType: "movie" | "tv",
) {
  let searchQuery = encodeURIComponent(query);
  const api_key = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/search/${mediaType}?query=${searchQuery}&include_adult=true&language=pt-BR&api_key=${api_key}`;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };
  let result = await fetch(url, options);
  return result.json();
}
