"use client";

import Link from "next/link";
import styles from "@/styles/header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const PathName = usePathname();
  return (
    <div className={styles.container}>
      <p>Logo</p>
      <Link className={`${PathName === "/" && styles.active}`} href="/">
        Lumière
      </Link>
      <Link
        className={`${PathName === "/login" && styles.active}`}
        href="/login"
      >
        Entrar
      </Link>
      <Link
        className={`${PathName === "/users" && styles.active}`}
        href="/users"
      >
        Usuários
      </Link>
    </div>
  );
}
