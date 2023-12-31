/* eslint-disable @next/next/no-img-element */
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { Group } from "@/utils/types";
import styles from "@/styles/clubs.module.css";
import Sidebar from "@/components/Sidebar";
import ContentListItem from "@/components/ContentListItem";
import ContentQueueItem from "@/components/ContentQueueItem";
import DeleteClub from "@/components/DeleteClub";

type MetadataProps = {
  params: { clubId: string };
};

async function getSession() {
  return await getServerSession(authOptions);
}

async function getClub(clubId: string) {
  return authorizedFetch(`groups/${clubId}`, { cache: "no-cache" });
}

async function getClubs() {
  const session = await getSession();
  return authorizedFetch(`users/${session?.user.user_id}/groups`, {
    cache: "no-cache",
  });
}

export async function generateMetadata({ params }: MetadataProps) {
  const clubId = params.clubId;
  const club: Group = await getClub(clubId);

  return {
    title: `Clube ${club.group_name}`,
  };
}

const API_URL = process.env.API_URL;

export default async function Clubs({
  params,
}: {
  params: { clubId: string };
}) {
  const session = await getServerSession(authOptions);
  const { clubId } = params;
  const club: Group = await getClub(clubId);
  const clubs: Group[] = await getClubs();

  const me = club.Users.filter((user) => {
    return user.user_id == session?.user.user_id;
  })[0];

  return (
    <div className={styles.container}>
      <Sidebar
        clubs={clubs}
        clubId={club.group_id}
        userId={session?.user.user_id}
      />
      <div className={styles.group_container}>
        <div className={styles.group_info}>
          <div className={styles.header}>
            <h1 className={styles.group_name}>{club.group_name}</h1>
            <DeleteClub clubId={club.group_id} />
          </div>
          <div className={styles.header}>
            <p>Membros:</p>
            <div>
              {club.Users.map((user) => (
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
          <ContentQueueItem
            groupId={club.group_id}
            contentQueue={club.ContentQueue}
          />
          {club.ContentLists.map((contentList) => (
            <div key={contentList.list_id}>
              <ContentListItem
                contentList={contentList}
                permissions={me.GroupMember.permissions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
