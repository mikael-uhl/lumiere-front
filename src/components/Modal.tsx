import { ReactNode } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styles from "@/styles/modal.module.css";

type ModalProps = {
  children: ReactNode;
  isVisible: boolean;
  title?: string;
  onClose: any;
};

export default function Modal({
  children,
  isVisible,
  title,
  onClose,
}: ModalProps) {
  if (!isVisible) return null;
  return (
    <div className={styles.container}>
      <div className={styles.model_container}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.close_item} onClick={onClose}>
            <CloseRoundedIcon />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
