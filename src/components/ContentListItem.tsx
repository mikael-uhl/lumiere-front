import { ContentList } from "@/utils/types";
import styles from "@/styles/contentList.module.css";
import ContentItems from "./ContentItem";

export default function ContentListItem({
  contentList,
}: {
  contentList: ContentList;
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{contentList.list_name}</h3>
      {contentList.ContentItems.length === 0 ? (
        <li>Lista Vazia</li>
      ) : (
        contentList.ContentItems.map((contentItem) => (
          <ContentItems key={contentItem.item_id} contentItem={contentItem} />
        ))
      )}
    </div>
  );
}
