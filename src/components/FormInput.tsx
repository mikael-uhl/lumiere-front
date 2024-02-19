import styles from "@/styles/formInput.module.css";
import { InputHTMLAttributes } from "react";

type FormInputProps = {
  title?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({ title, ...props }: FormInputProps) {
  return (
    <div className={styles.content}>
      {title && <label htmlFor="">{title}:</label>}
      <input className={styles.text_input} {...props} />
    </div>
  );
}
