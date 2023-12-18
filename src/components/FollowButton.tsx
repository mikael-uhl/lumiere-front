"use client";

import { useState } from "react";
import styles from "@/styles/followButton.module.css";
import { UUID } from "crypto";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { useRouter } from "next/navigation";

async function follow(userId: UUID) {
  authorizedFetch(`followers/follow/${userId}`, { method: "POST" });
}

async function unfollow(userId: UUID) {
  authorizedFetch(`followers/unfollow/${userId}`, { method: "DELETE" });
}

export default function FollowButton({
  userId,
  amIFollowing,
}: {
  userId: UUID;
  loggedUserId?: UUID;
  amIFollowing: boolean;
}) {
  const router = useRouter();
  const [unfollowHover, setUnfollow] = useState<boolean>(false);

  const handleFollow = async () => {
    await follow(userId);
    router.refresh();
  };

  const handleUnfollow = async () => {
    await unfollow(userId);
    router.refresh();
  };

  return (
    <>
      {amIFollowing ? (
        <button
          className={`${styles.following} ${
            unfollowHover ? styles.unfollow : ""
          }`}
          onMouseEnter={() => setUnfollow(true)}
          onMouseLeave={() => setUnfollow(false)}
          onClick={handleUnfollow}
        >
          {unfollowHover ? "Deixar de seguir" : "Seguindo"}
        </button>
      ) : (
        <button className={styles.follow} onClick={handleFollow}>
          Seguir
        </button>
      )}
    </>
  );
}
