import { ContentItem, ContentList } from "@/utils/types";
import styles from "@/styles/contentList.module.css";
import ContentItems from "./ContentItem";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { UUID } from "crypto";

async function getItems(contentListId: UUID) {
  return authorizedFetch(
    `content-lists/${contentListId}/content-items?order=title`,
    {
      cache: "no-cache",
    },
  );
}

export default async function ContentListItem({
  contentList,
}: {
  contentList: ContentList;
}) {
  const contentItems: ContentItem[] = await getItems(contentList.list_id);
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{contentList.list_name}</h3>
      {contentItems.length === 0 ? (
        <div className={styles.content}>Ainda não possui conteúdo!</div>
      ) : (
        <div className={styles.content}>
          {contentItems.map((contentItem) => (
            <div className={styles.item} key={contentItem.item_id}>
              <ContentItems contentItem={contentItem} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
