"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import styles from "@/styles/sidebar.module.css";
import { UUID } from "crypto";
import NewClub from "./NewClub";

export function CreateClub({ userId }: { userId?: UUID }) {
  const [isVisible, setVisible] = useState<boolean>(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal isVisible={isVisible} title="Criar clube" onClose={handleClose}>
        <NewClub userId={userId} />
      </Modal>
      <div className={`${styles.link} ${styles.add}`} onClick={handleOpen}>
        <AddCircleRoundedIcon />
      </div>
    </>
  );
}
