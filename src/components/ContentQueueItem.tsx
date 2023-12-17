"use client";
import { ContentQueue } from "@/utils/types";
import styles from "@/styles/contentQueue.module.css";
import { UUID } from "crypto";
import { authorizedFetch } from "@/utils/authorizedMethods";
import { useRouter } from "next/navigation";

async function createQueue(groupId: UUID) {
  await authorizedFetch(`groups/${groupId}/content-queues`, {
    method: "POST",
  });
}

export default function ContentQueueItem({
  contentQueue,
  groupId,
}: {
  contentQueue: ContentQueue;
  groupId: UUID;
}) {
  const router = useRouter();

  const handleClick = async () => {
    await createQueue(groupId);
    router.refresh();
  };

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
            <button onClick={handleClick}>Crie uma!</button>
          </>
        )}
      </div>
    </div>
  );
}
