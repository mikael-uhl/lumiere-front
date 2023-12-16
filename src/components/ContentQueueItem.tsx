import { ContentQueue } from "@/utils/types";
import styles from "@/styles/contentQueue.module.css";

export default function ContentQueueItem({
  contentQueue,
}: {
  contentQueue: ContentQueue;
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Fila</h3>
      <div className={styles.content}>
        {contentQueue ? (
          contentQueue.ContentItems.length > 0 ? (
            `Possui ${contentQueue.ContentItems.length} itens de conteúdo!`
          ) : (
            "Ainda não possui conteúdo!"
          )
        ) : (
          <>
            <p>Este clube ainda não possui uma fila!</p>
            <button>Crie uma!</button>
          </>
        )}
      </div>
    </div>
  );
}
