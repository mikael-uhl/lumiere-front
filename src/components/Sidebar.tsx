"use client";

import styles from "@/styles/sidebar.module.css";
import { Group } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { UUID } from "crypto";
import { CreateClub } from "./CreateClub";

const extractInitials = (text: string) =>
  text
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("");

export default function Sidebar({
  clubs,
  userId,
}: {
  clubs: Group[];
  clubId: UUID;
  userId?: UUID;
}) {
  const [active, setActive] = useState<boolean>(false);
  const PathNameId = usePathname().split("/").pop();

  useEffect(() => {
    const handleClick = () => {
      setActive(false);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [active]);

  return (
    <div className={`${styles.container} ${active && styles.active_menu}`}>
      <div className={styles.toggle_menu} onClick={() => setActive(!active)}>
        {active ? (
          <CloseRoundedIcon />
        ) : (
          <KeyboardDoubleArrowRightRoundedIcon />
        )}
      </div>
      <nav className={styles.link_container}>
        {clubs.map((club) => (
          <Link
            key={club.group_id}
            href={`/clubs/${club.group_id}`}
            className={`${styles.link} ${
              PathNameId === club.group_id && styles.active
            }`}
          >
            <span className={styles.initials}>
              {extractInitials(club.group_name)}
            </span>
            <span className={styles.fullText}>{club.group_name}</span>
          </Link>
        ))}
        <CreateClub userId={userId} />
      </nav>
    </div>
  );
}
