"use client";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import styles from "@/styles/contentItem.module.css";
import { ContentItem } from "@/utils/types";
import { useState } from "react";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { UUID } from "crypto";

async function updateItem(item_id: UUID, completed: boolean) {
  const options = {
    body: { completed },
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  };

  return authorizedFetch(`content/${item_id}`, {
    ...options,
    cache: "no-cache",
  });
}

export default function ContentItems({
  contentItem,
}: {
  contentItem: ContentItem;
}) {
  const [completed, setCompleted] = useState<boolean>(contentItem.completed);

  const handleSelect = async () => {
    const updatedCompleted = !completed;
    setCompleted(updatedCompleted);
    await updateItem(contentItem.item_id, updatedCompleted);
  };

  return (
    <div className={styles.container}>
      <div className={styles.radio_item} onClick={handleSelect}>
        {completed ? (
          <RadioButtonCheckedRoundedIcon />
        ) : (
          <RadioButtonUncheckedRoundedIcon />
        )}
      </div>
      <div>
        {contentItem.title} ({contentItem.year})
      </div>
    </div>
  );
}
