"use client";
import styles from "@/styles/newContentItem.module.css";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

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
  const [year, setYear] = useState<number>();
  const [genre, setGenre] = useState<string>("");

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    await createContentItem({ title, year, genre, list_id: contentListId });
    onClose();
    router.refresh();
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <input
        className={styles.text_input}
        type={"text"}
        placeholder={"Título"}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        required
      />
      <input
        className={styles.text_input}
        type={"number"}
        placeholder={"Ano"}
        min={1895}
        onChange={(e) => setYear(parseInt(e.target.value))}
      />
      <input
        className={styles.text_input}
        type={"text"}
        placeholder={"Gênero"}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
      <input
        className={styles.text_input}
        type={"submit"}
        value={"Adicionar"}
      />
    </form>
  );
}
