/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/media.module.css";

export default function Media({ item, type }: { item: object; type: string }) {
  let title;
  let originalTitle;
  let launch;

  if (type === "tv") {
    title = item.name;
    originalTitle = item.original_name;
    launch = item.first_air_date;
  } else {
    title = item.title;
    originalTitle = item.original_title;
    launch = item.release_date;
  }

  return (
    <div className={styles.container}>
      <img
        alt="poster"
        className={styles.image}
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
            : "https://cdn.awsli.com.br/2500x2500/549/549871/produto/29108392/60cdfb3799.jpg"
        }
      />
      <div className={styles.media_info}>
        <p>
          <span className={styles.title}>{title}</span>{" "}
          {launch && `(${launch.substring(0, 4)})`}
        </p>
        <p className={styles.original_title}>{originalTitle}</p>
      </div>
    </div>
  );
}
