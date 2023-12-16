"use client";

import styles from "@/styles/logoutbutton.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();
  async function logout() {
    await signOut({
      redirect: false,
    });

    router.push("/");
    router.refresh();
  }

  return (
    <button className={styles.button} onClick={logout}>
      Sair
    </button>
  );
}
