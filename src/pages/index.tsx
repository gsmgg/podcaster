import { GetStaticProps } from "next";
import Image from "next/image";
import { api } from "../services/api";
import { formatEpisodes } from "../utils/formatEpisodes";
import Link from "next/link";
import styles from "./home.module.scss";
import { Episodes } from "../types/episodeType";
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

type HomeProps = {
  latestEpisodes: Array<Episodes>;
  allEpisodes: Array<Episodes>;
  // Isso equivale a Episodes[];
};

export default function Home(props: HomeProps) {
  const { playFunction } = useContext(PlayerContext);

  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Novo episódio</h2>

        <ul>
          {props.latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <div className={styles.content}>
                  <div className={styles.thumbnail}>
                    <Link href={`/episodes/${episode.id}`}>
                      <Image
                        width={192}
                        height={192}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </Link>
                  </div>

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>

                    <p className={styles.members}>{episode.members}</p>

                    <div className={styles.moreInfo}>
                      <span>{episode.published_at_formated} </span>
                      <span className={styles.divider}> | </span>
                      <span> {episode.file.duration_formated}</span>
                    </div>
                  </div>
                </div>

                <div className="action">
                  <button type="button" onClick={() => playFunction(episode)}>
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os episódios</h2>

        <table cellSpacing={8}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <div className={styles.thumbnail}>
                      <Link href={`/episodes/${episode.id}`}>
                        <Image
                          width={192}
                          height={192}
                          src={episode.thumbnail}
                          alt={episode.title}
                          objectFit="cover"
                        />
                      </Link>
                    </div>
                  </td>

                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>
                    {episode.published_at_formated}
                  </td>
                  <td>{episode.file.duration_formated}</td>
                  <td>
                    <button type="button" onClick={() => playFunction(episode)}>
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const latestEpisodes = await api.get("/episodes", {
    params: {
      _limit: 1,
      _sort: "publishe_at",
      _order: "desc",
    },
  });

  const allEpisodes = await api.get("/episodes", {
    params: {
      _limit: 8,
      _sort: "publishe_at",
      _order: "desc",
    },
  });

  return {
    props: {
      latestEpisodes: formatEpisodes(latestEpisodes.data),
      allEpisodes: formatEpisodes(allEpisodes.data),
    },
    revalidate: 60 * 60 * 8,
  };
};
