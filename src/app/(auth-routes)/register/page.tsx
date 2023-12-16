import RegisterForm from "@/components/RegisterForm";
import styles from "@/styles/login.module.css";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function Register() {
  return (
    <div className={styles.container}>
      <RegisterForm />
      <Link href={"/login"}>Já tenho uma conta.</Link>
    </div>
  );
}
