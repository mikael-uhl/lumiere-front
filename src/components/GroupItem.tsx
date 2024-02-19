import { Group } from "@/utils/types";
import styles from "@/styles/groupitem.module.css";
import ProfileImage from "./ProfileImage";

export default function GroupItem({ group }: { group: Group }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.group_name}>{group.group_name}</h3>
        <div>
          {group.Users.map((user) => (
            <ProfileImage key={user.user_id} user={user} imageSize={30} />
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
