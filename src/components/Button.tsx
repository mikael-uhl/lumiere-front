"use client";

import styles from "@/styles/button.module.css";
import { ReactNode } from "react";

type ButtonProps = { children: ReactNode; color?: String };

export default function Button({ children }: ButtonProps) {
  return <button className={styles.button}>{children}</button>;
}
