"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import styles from "@/styles/login.module.css";
import FormInput from "./FormInput";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error(result);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <FormInput
        type={"email"}
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        required
      />
      <FormInput
        type={"password"}
        placeholder={"Senha"}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <FormInput type={"submit"} value={"Entrar"} />
    </form>
  );
}
