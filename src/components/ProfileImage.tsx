/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/profileImage.module.css";
import { User } from "@/utils/types";
import { Tooltip } from "@mui/material";

const API_URL = process.env.API_URL;

export default function ProfileImage({
  user,
  imageSize,
  tooltip = true,
}: {
  user: User;
  profileImageUrl?: String;
  imageSize: number;
  tooltip?: boolean;
}) {
  const fullName = `${user.first_name} ${user.last_name}`;
  const profileImageUrl = user.profile_image_url;
  const imageUrl = profileImageUrl
    ? `${API_URL}/pictures/${profileImageUrl}`
    : "/user.png";
  return (
    <>
      {tooltip ? (
        <Tooltip
          title={
            <>
              <h3>{fullName}</h3>
              <p>{user.email}</p>
            </>
          }
          placement="bottom"
        >
          <img
            alt={`Foto de perfil de ${user.username}`}
            src={imageUrl}
            style={{ width: imageSize, height: imageSize }}
            className={styles.profile_image}
          />
        </Tooltip>
      ) : (
        <img
          alt={`Foto de perfil de ${user.username}`}
          src={imageUrl}
          style={{ width: imageSize, height: imageSize }}
          className={styles.profile_image}
        />
      )}
    </>
  );
}
