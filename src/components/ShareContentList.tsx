"use client";

import { ContentItem, ContentList } from "@/utils/types";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import styles from "@/styles/contentList.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ShareContentList({
  contentList,
  contentItems,
}: {
  contentList: ContentList;
  contentItems: ContentItem[];
}) {
  function convertToFormattedString() {
    let moviesString = `*${contentList.list_name}*\n\n`;

    contentItems.forEach((contentItem) => {
      const { title, year, completed } = contentItem;
      const checkbox = completed === true ? "✔" : "◻";
      moviesString += `${checkbox} *${title} (${year})*\n`;
    });

    return moviesString;
  }

  return (
    <CopyToClipboard
      text={convertToFormattedString()}
      onCopy={() => {
        alert(
          `${contentList.list_name} copiada com sucesso para a área de transferência!`,
        );
      }}
    >
      <button className={styles.share}>
        <ShareRoundedIcon /> Compartilhar Lista
      </button>
    </CopyToClipboard>
  );
}
