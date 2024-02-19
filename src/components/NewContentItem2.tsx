"use client";
import styles from "@/styles/newContentItem.module.css";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import Media from "./Media";
import { searchMediaByQuery } from "@/utils/tmdbMediaApi";

async function createContentItem(body: object) {
  return authorizedFetch("content", {
    body,
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
  });
}

export default function NewContentItem({
  contentListId,
  onClose,
}: {
  contentListId: UUID;
  onClose?: any;
}) {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [originalTitle, setOriginalTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null; // Define o tipo do timeout

  useEffect(() => {
    handleSearchChange(title, false); // Atualiza os resultados da busca ao alterar o tipo de mídia
  }, [mediaType]);

  async function setMedia(media: object) {
    let mediaTitle;
    let mediaOriginalTitle;
    let mediaYear;

    if (mediaType === "movie") {
      mediaTitle = media.title;
      mediaOriginalTitle = media.original_title;
      mediaYear = media.release_date.substring(0, 4);
    } else {
      mediaTitle = media.name;
      mediaOriginalTitle = media.original_name;
      mediaYear = media.first_air_date.substring(0, 4);
    }

    console.log("Item:", { mediaTitle, mediaOriginalTitle, mediaYear });

    await createContentItem({
      title: mediaTitle,
      original_title: mediaOriginalTitle,
      year: mediaYear,
      list_id: contentListId,
    });

    onClose();
    router.refresh();
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    await createContentItem({ title, year, list_id: contentListId });
    onClose();
    router.refresh();
  }

  async function handleSearchChange(query: string, debounce: boolean = true) {
    if (debounce) {
      clearTimeout(debounceTimeout!);
    }

    debounceTimeout = setTimeout(
      async () => {
        if (query.trim() === "") {
          setSearchResults([]);
          return;
        }

        try {
          const result = await searchMediaByQuery(query, mediaType);
          setSearchResults(result.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      },
      debounce ? 500 : 0,
    ); // Se debounce for verdadeiro, aplica o debounce de 500ms, senão, executa imediatamente
  }

  function handleClearTitle() {
    setTitle(""); // Limpa o estado do título
    setSearchResults([]); // Limpa os resultados da busca
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <input
        className={styles.text_input}
        type={"text"}
        placeholder={"Título"}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          handleSearchChange(e.target.value); // Trigger search on input change
        }}
        autoFocus
        required
      />
      <button
        className={styles.clear_button}
        type="button"
        onClick={handleClearTitle}
      >
        Limpar
      </button>
      <div className={styles.options}>
        <label>
          <input
            type="radio"
            value="movie"
            checked={mediaType === "movie"}
            onChange={() => {
              setMediaType("movie");
              handleSearchChange(title, false);
            }}
          />
          Filme
        </label>
        <label>
          <input
            type="radio"
            value="tv"
            checked={mediaType === "tv"}
            onChange={() => {
              setMediaType("tv");
              handleSearchChange(title, false);
            }}
          />
          Série
        </label>
      </div>
      {searchResults && searchResults.length > 0 && (
        <ul className={styles.media_list}>
          {searchResults.map((item) => (
            <li key={item.id}>
              <div onClick={() => setMedia(item)}>
                <Media item={item} type={mediaType} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
