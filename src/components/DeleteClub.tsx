"use client";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import styles from "@/styles/clubs.module.css";
import { useState } from "react";
import { UUID } from "crypto";
import Modal from "./Modal";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { useRouter } from "next/navigation";

async function deleteClub(clubId: UUID) {
  authorizedFetch(`groups/${clubId}`, { method: "DELETE" });
}

export default function DeleteClub({ clubId }: { clubId: UUID }) {
  const router = useRouter();
  const [isVisible, setVisible] = useState<boolean>(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    await deleteClub(clubId);
    router.replace("/clubs");
  };

  return (
    <>
      <Modal isVisible={isVisible} title="Deletar clube" onClose={handleClose}>
        <div className={styles.delete_container}>
          <p>Deseja mesmo deletar o grupo?</p>
          <button onClick={handleDelete}>Sim</button>
        </div>
      </Modal>
      <span className={styles.delete} onClick={handleOpen}>
        <DeleteRoundedIcon />
      </span>
    </>
  );
}
