/* eslint-disable @next/next/no-img-element */
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { Group } from "@/utils/types";
import styles from "@/styles/clubs.module.css";
import Sidebar from "@/components/Sidebar";
import ContentListItem from "@/components/ContentListItem";
import ContentQueueItem from "@/components/ContentQueueItem";

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
  // const session = await getSession();
  const { clubId } = params;
  const club: Group = await getClub(clubId);
  const clubs: Group[] = await getClubs();

  return (
    <div className={styles.container}>
      <Sidebar clubs={clubs} />
      <div className={styles.group_container}>
        <div className={styles.group_info}>
          <h1 className={styles.group_name}>{club.group_name}</h1>
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
          <ContentQueueItem contentQueue={club.ContentQueue} />
          {club.ContentLists.map((contentList) => (
            <div key={contentList.list_id}>
              <ContentListItem contentList={contentList} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
