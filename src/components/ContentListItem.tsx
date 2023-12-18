import { ContentItem, ContentList } from "@/utils/types";
import styles from "@/styles/contentList.module.css";
import ContentItems from "./ContentItem";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { UUID } from "crypto";
import { AddContentItem } from "./AddContentItem";

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
  permissions,
}: {
  contentList: ContentList;
  permissions: "read" | "read-write";
}) {
  const contentItems: ContentItem[] = await getItems(contentList.list_id);

  return (
    <>
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
        {permissions === "read-write" && (
          <div className={styles.add_container}>
            <AddContentItem listId={contentList.list_id} />
          </div>
        )}
      </div>
    </>
  );
}
