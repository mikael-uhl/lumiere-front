"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import styles from "@/styles/login.module.css";
import { authorizedFetch } from "@/utils/authorizedMethods";
import FormInput from "./FormInput";

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
  const [formUser, setFormUser] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    await createUser(formUser);

    router.replace("/login");
    router.refresh();
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <FormInput
        type={"text"}
        name={"first_name"}
        title={"Nome"}
        onChange={handleChange}
        required
      />
      <FormInput
        type={"text"}
        name={"last_name"}
        title={"Sobrenome"}
        onChange={handleChange}
        required
      />
      <FormInput
        type={"date"}
        name={"date_of_birth"}
        title={"Data de Nascimento"}
        onChange={handleChange}
        required
      />
      <FormInput
        type={"email"}
        name={"email"}
        title={"Endereço de e-mail"}
        onChange={handleChange}
        required
      />
      <FormInput
        type={"text"}
        name={"username"}
        title={"Nome de usuário"}
        onChange={handleChange}
        required
      />
      <FormInput
        type={"password"}
        name={"password"}
        title={"Senha"}
        onChange={handleChange}
        required
      />
      <FormInput
        type={"password"}
        name={"confirm_password"}
        title={"Confirmar senha"}
        onChange={handleChange}
        required
      />
      <FormInput type={"submit"} value={"Criar Usuário"} />
    </form>
  );
}
