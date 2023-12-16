import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { Group } from "@/utils/types";
import { getServerSession } from "next-auth";
import styles from "@/styles/clubs.module.css";
import Link from "next/link";
import GroupItem from "@/components/GroupItem";

async function getSession() {
  return await getServerSession(authOptions);
}

async function getGroups() {
  const session = await getSession();

  return authorizedFetch(`users/${session?.user.user_id}/groups`, {
    cache: "no-cache",
  });
}

export async function generateMetadata() {
  const session = await getSession();
  const fullName = `${session?.user.first_name} ${session?.user.last_name}`;
  return {
    title: `Clubes de ${fullName}`,
  };
}

export default async function Clubs() {
  const groups: Group[] = await getGroups();
  return (
    <div className={`${styles.container} main`}>
      {groups.map((group) => (
        <Link key={group.group_id} href={`/clubs/${group.group_id}`}>
          <GroupItem group={group} />
        </Link>
      ))}
    </div>
  );
}
