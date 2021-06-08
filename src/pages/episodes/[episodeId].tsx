import { GetStaticPaths, GetStaticProps } from "next";
import { useContext } from "react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { Episodes } from "../../types/episodeType";
import { formatEpisodes } from "../../utils/formatEpisodes";
import Image from "next/image";
import Link from "next/link";
import styles from "./episode.module.scss";
import { PlayerContext } from "../../contexts/PlayerContext";

type EpisodePageProps = {
  episode: Episodes;
};

export default function Episode({ episode }: EpisodePageProps) {
  const router = useRouter();

  const { playFunction } = useContext(PlayerContext);

  return (
    <>
      <Link href="/">Voltar</Link>
      <div className={styles.episode}>
        <div className={styles.tumbnailContainer}>
          <Image
            width={700}
            height={160}
            src={episode.thumbnail}
            objectFit="cover"
          ></Image>
          <button type="button" onClick={() => playFunction(episode)}>
            <img src="/play.svg" alt="Tocar episódio" />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>

          <span>{episode.published_at_formated}</span>

          <span>{episode.file.duration_formated}</span>
        </header>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </>
  );
}

/*
  Permite a criação de arquivos estáticos 
  dinâmicos. Isso é, esse componente é unico e estático
  mas pode ser para 1 ou 1000 episódios. Em suma, esse arquivo
  é como se fosse um template de um episódio. Para isso, use
  a tag abaixo.
*/
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("/podecaster", {
    params: {
      _limit: 3,
      _sort: "publishe_at",
      _order: "desc",
    },
  });

  const paths = data.map((episode: Episodes) => {
    return {
      params: {
        episodeId: episode.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { episodeId } = ctx.params;

  const { data } = await api.get(`/podecaster/${episodeId}`);

  const episodeData = formatEpisodes([data]);
  const episode = episodeData[0];

  return {
    props: { episode },
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
