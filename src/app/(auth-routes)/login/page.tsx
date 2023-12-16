import LoginForm from "@/components/LoginForm";
import styles from "@/styles/login.module.css";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginForm />
      <a href={"#"} className={styles.forgot_password}>
        Esqueci minha senha.
      </a>
      <Link href={"/register"}>Não tenho uma conta.</Link>
    </div>
  );
}
