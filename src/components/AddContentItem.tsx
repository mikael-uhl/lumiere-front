"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import NewContentItem from "@/components/NewContentItem";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import styles from "@/styles/contentList.module.css";
import { UUID } from "crypto";

export function AddContentItem({ listId }: { listId: UUID }) {
  const [isVisible, setVisible] = useState<boolean>(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal isVisible={isVisible} title="Adicionar item" onClose={handleClose}>
        <NewContentItem contentListId={listId} />
      </Modal>
      <div className={styles.add} onClick={handleOpen}>
        <AddCircleRoundedIcon /> Adicionar item
      </div>
    </>
  );
}
