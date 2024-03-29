import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authorizedFetch } from "@/utils/authorizedMethods";
import styles from "@/styles/profile.module.css";
import { Group, User } from "@/utils/types";
import ButtonLogout from "@/components/ButtonLogout";
import { UUID } from "crypto";
import FollowButton from "@/components/FollowButton";
import ProfileImage from "@/components/ProfileImage";
import Link from "next/link";
import NotFound from "@/app/not-found";

type MetadataProps = {
  params: { username: string };
};

async function getSession() {
  return await getServerSession(authOptions);
}

async function getUser(username: string) {
  return authorizedFetch(`users/username/${username}`, { cache: "no-cache" });
}

async function getFollowers(userId?: UUID) {
  return authorizedFetch(`followers/${userId}`, {
    cache: "no-cache",
  });
}

async function getFollowing(userId?: UUID) {
  return authorizedFetch(`follows/${userId}`, {
    cache: "no-cache",
  });
}

async function getClubs(userId: UUID) {
  return authorizedFetch(`users/${userId}/groups`, {
    cache: "no-cache",
  });
}

export async function generateMetadata({ params }: MetadataProps) {
  const username = params.username;
  const user: User = await getUser(username);
  const fullName = `${user?.first_name} ${user?.last_name}`;

  return {
    title: `Perfil de ${fullName}`,
  };
}

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const session = await getSession();
  const { username } = params;
  const user: User = await getUser(username);
  const followers: User[] = await getFollowers(user.user_id);
  const following: User[] = await getFollowing(user.user_id);
  const clubs: Group[] = await getClubs(user.user_id);

  if (user.error) return <NotFound />;

  const me = session?.user;
  const itsMe = me?.user_id == user.user_id;
  const amIFollowing = followers.some(
    (follower) => follower.user_id == session?.user.user_id,
  );

  return (
    <div className={`${styles.container} main`}>
      <div className={styles.profile_info_container}>
        <div className={styles.profile_info}>
          <ProfileImage user={user} imageSize={100} tooltip={false} />
          <div className={styles.name_follow}>
            <div className={styles.user_name}>
              {user?.first_name} {user?.last_name}
            </div>
            {itsMe ? (
              <Link href="/settings">
                <button className={styles.edit_profile}>Editar Perfil</button>
              </Link>
            ) : (
              <FollowButton
                userId={user.user_id}
                loggedUserId={session?.user.user_id}
                amIFollowing={amIFollowing}
              />
            )}
          </div>
        </div>
        <div className={styles.info_container}>
          <div className={styles.followers}>
            <div>{followers.length}</div>
            <div>Seguidores</div>
          </div>
          <div className={styles.following}>
            <div>{following.length}</div>
            <div>Seguindo</div>
          </div>
          <div className={styles.clubs}>
            <div>{clubs.length}</div>
            <div>Clubes</div>
          </div>
        </div>
      </div>

      {itsMe && <ButtonLogout />}
    </div>
  );
}
