"use client";

import Link from "next/link";
import styles from "@/styles/header.module.css";
import { usePathname } from "next/navigation";
import { NavLink } from "@/utils/types";
import Image from "next/image";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState, useEffect } from "react";
import { Session } from "next-auth";

const headerGuestLinks: NavLink[] = [
  { displayName: "Entrar", path: "/login" },
  { displayName: "Criar Conta", path: "/register" },
];

const headerLoggedInLinks: NavLink[] = [
  { displayName: "Perfil", path: "/profile" },
  { displayName: "Usuários", path: "/users" },
  { displayName: "Clubes", path: "/clubs" },
];

export default function Header({ session }: { session: Session | null }) {
  const [active, setActive] = useState<boolean>(false);
  const PathName = usePathname();
  const linksToUse = session ? headerLoggedInLinks : headerGuestLinks;

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
    <header className={styles.container}>
      <div className={styles.logo_container}>
        <Link href={"/"}>
          <Image src={"/logo.png"} alt={"Logo"} width={30} height={30} />
          <span className={styles.project_name}>Lumière</span>
        </Link>
      </div>
      <nav
        className={`${styles.link_container} ${active && styles.active_menu}`}
      >
        {linksToUse.map((link) => (
          <Link
            href={link.path}
            key={link.displayName}
            className={`${PathName === link.path && styles.active}`}
          >
            {link.displayName}
          </Link>
        ))}
      </nav>
      <div className={styles.toggle_menu} onClick={() => setActive(!active)}>
        {active ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
      </div>
    </header>
  );
}
