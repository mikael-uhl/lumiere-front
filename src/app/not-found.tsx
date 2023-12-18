import Link from "next/link";
import styles from "@/styles/page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página Não Encontrada",
};

export default function NotFound() {
  return (
    <div className={`${styles.container} main`}>
      <div className={styles.content}>
        <h2 className={styles.title}>Página não encontrada!</h2>
        <Link href="/" className={styles.button}>
          Voltar para página Inicial
        </Link>
      </div>
    </div>
  );
}
