"use client";

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import styles from "@/styles/login.module.css";
import { authorizedFetch } from "@/utils/authorizedMethods";

async function createUser(body: object) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body,
  };

  const newUser = await authorizedFetch("users", options);

  return newUser;
}

export default function RegisterForm() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const body = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    };

    const newUser = await createUser(body);

    console.log("Usuário criado com sucesso: ", newUser);

    router.replace("/login");
    router.refresh();
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <input
        className={styles.text_input}
        type={"text"}
        placeholder={"Nome"}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        className={styles.text_input}
        type={"text"}
        placeholder={"Sobrenome"}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        className={styles.text_input}
        type={"email"}
        placeholder={"Endereço de e-mail"}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={styles.text_input}
        type={"text"}
        placeholder={"Nome de usuário"}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className={styles.text_input}
        type={"password"}
        placeholder={"Senha"}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className={styles.text_input}
        type={"submit"}
        value={"Criar Usuário"}
      />
    </form>
  );
}
