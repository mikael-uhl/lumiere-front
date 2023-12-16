import React from "react";
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <div className={`${styles.container} main`}>
      <p>
        No Lumière, mergulhe em uma experiência única onde a paixão pelo cinema
        se encontra com a comunidade. Explore listas personalizadas de filmes,
        séries e curtas-metragens, compartilhadas por membros apaixonados. Crie
        seus próprios grupos, conecte-se com entusiastas semelhantes e descubra
        novos tesouros cinematográficos.
      </p>

      <p>
        Seja você um cineasta dedicado ou um apreciador casual, o Lumière é o
        seu espaço para compartilhar, descobrir e se inspirar. A magia do cinema
        ganha vida nesta comunidade vibrante. Junte-se a nós e faça parte de uma
        jornada cinematográfica como nenhuma outra. Lumière - iluminando a tela
        das suas histórias favoritas!
      </p>
    </div>
  );
}
