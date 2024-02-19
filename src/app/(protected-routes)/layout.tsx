import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Modal from "@/components/Modal";
import ButtonLogout from "@/components/ButtonLogout";
import styles from "@/styles/page.module.css";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await getServerSession(authOptions);

  if (session?.error == "RefreshAccessTokenError") {
    return (
      <Modal isVisible title="Sessão Expirada">
        <div className={styles.modal_container}>
          <p>
            Desculpe, sua sessão expirou. Por favor, faça login novamente para
            continuar utilizando o Lumière.
          </p>
          <div className={styles.center}>
            <ButtonLogout />
          </div>
        </div>
      </Modal>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
