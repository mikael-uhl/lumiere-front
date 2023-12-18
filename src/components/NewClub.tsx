"use client";
import styles from "@/styles/newContentItem.module.css";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { Group } from "@/utils/types";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

async function createClub(body: object, userId?: UUID) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  const club: Group = await authorizedFetch("groups", { ...options, body });
  return authorizedFetch(`groups/${club.group_id}/users/${userId}`, {
    ...options,
    body: {
      permissions: "read-write",
    },
  });
}

export default function NewClub({ userId }: { userId?: UUID }) {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const groupMember = await createClub({ group_name: name }, userId);
    router.push(`/clubs/${groupMember.group_id}`);
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <input
        className={styles.text_input}
        type={"text"}
        placeholder={"Nome do clube"}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        required
      />
      <input className={styles.text_input} type={"submit"} value={"Criar!"} />
    </form>
  );
}
