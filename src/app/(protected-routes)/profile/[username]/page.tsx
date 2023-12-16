/* eslint-disable @next/next/no-img-element */
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authorizedFetch } from "@/utils/authorizedMethods";
import styles from "@/styles/profile.module.css";
import { User } from "@/utils/types";
import ButtonLogout from "@/components/ButtonLogout";

type MetadataProps = {
  params: { username: string };
};

async function getSession() {
  return await getServerSession(authOptions);
}

async function getUser(username: string) {
  return authorizedFetch(`users/username/${username}`, { cache: "no-cache" });
}

export async function generateMetadata({ params }: MetadataProps) {
  const username = params.username;
  const user: User = await getUser(username);
  const fullName = `${user?.first_name} ${user?.last_name}`;

  return {
    title: `Perfil de ${fullName}`,
  };
}

const API_URL = process.env.API_URL;

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const session = await getSession();
  const { username } = params;
  const user = await getUser(username);
  const profileImageUrl = user?.profile_image_url
    ? `${API_URL}/pictures/${user?.profile_image_url}`
    : "/user.png";
  const me = session?.user;
  const itsMe = me?.user_id == user.user_id;
  return (
    <div className={`${styles.container} main`}>
      <div className={styles.profile_info}>
        <img
          alt="Foto de perfil"
          src={profileImageUrl}
          className={styles.profile_image}
        />
        <div>
          {user?.first_name} {user?.last_name}
        </div>
      </div>

      {itsMe && <ButtonLogout />}
    </div>
  );
}
