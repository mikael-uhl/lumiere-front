/* eslint-disable @next/next/no-img-element */
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import styles from "@/styles/profile.module.css";
import ButtonLogout from "@/components/ButtonLogout";

async function getSession() {
  return await getServerSession(authOptions);
}

export async function generateMetadata() {
  const session = await getSession();
  const fullName = `${session?.user.first_name} ${session?.user.last_name}`;
  return {
    title: `Perfil de ${fullName}`,
  };
}

const API_URL = process.env.API_URL;

export default async function Profile() {
  const session = await getSession();
  const user = session?.user;
  const profileImageUrl = user?.profile_image_url;

  return (
    <div className={`${styles.container} main`}>
      <div className={styles.profile_info}>
        <img
          alt="Foto de perfil"
          src={`${API_URL}/pictures/${profileImageUrl}`}
          className={styles.profile_image}
        />
        <div>
          {user?.first_name} {user?.last_name}
        </div>
      </div>

      <ButtonLogout />
    </div>
  );
}
