/* eslint-disable @next/next/no-img-element */
import { Group } from "@/utils/types";
import styles from "@/styles/groupitem.module.css";

const API_URL = process.env.API_URL;

export default function GroupItem({ group }: { group: Group }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.group_name}>{group.group_name}</h3>
        <div>
          {group.Users.map((user) => (
            <img
              key={user.user_id}
              src={`${API_URL}/pictures/${user.profile_image_url}`}
              className={styles.profile_image}
              alt={`Foto de perfil de ${user.username}`}
            />
          ))}
        </div>
      </div>
      <hr />
      <p className={styles.content_lists}>
        {group.Users.length > 1
          ? `${group.Users.length} membros.`
          : "Clube pessoal."}
      </p>
      <p className={styles.content_lists}>
        Contém {group.ContentLists.length} lista
        {group.ContentLists.length > 1 ? "s" : ""} de conteúdo!
      </p>
    </div>
  );
}
