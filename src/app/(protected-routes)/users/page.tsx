import { User } from "@/utils/types";
import { Metadata } from "next";
import styles from "@/styles/users.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authorizedFetch } from "@/utils/authorizedMethods";

export const metadata: Metadata = {
  title: "Usuários",
};

async function getUsers() {
  return authorizedFetch("users", { cache: "no-cache" });
}

export default async function Users() {
  const Users: User[] = await getUsers();
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <p>
        Olá,{"  "}
        <strong>
          {session?.user?.first_name} {session?.user?.last_name}
        </strong>
        . Veja uma lista com todos os usuários cadastrados em nosso banco!
      </p>
      <br />
      {Users.map((user) => (
        <p key={user.user_id}>
          Usuário: {user.first_name} {user.last_name}
        </p>
      ))}
    </div>
  );
}
