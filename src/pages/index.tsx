import { GetStaticProps } from "next";
import Image from "next/image";
import { api } from "../services/api";
import { formatEpisodes } from "../utils/formatEpisodes";
import styles from "./home.module.scss";

export type Episodes = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  published_at_formated: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
    duration_formated: string;
  };
};

type HomeProps = {
  latestEpisodes: Array<Episodes>;
  allEpisodes: Array<Episodes>;
  // Isso equivale a Episodes[];
};

export default function Home(props: HomeProps) {
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
                    <a href="">
                      <Image
                        width={192}
                        height={192}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </a>
                  </div>

                  <div className={styles.episodeDetails}>
                    <a href="">{episode.title}</a>
                    <p className={styles.members}>{episode.members}</p>

                    <div className={styles.moreInfo}>
                      <span>{episode.published_at_formated} </span>
                      <span className={styles.divider}> | </span>
                      <span> {episode.file.duration_formated}</span>
                    </div>
                  </div>
                </div>

                <div className="action">
                  <button type="button">
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
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </thead>
          <tbody>
            {props.allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td>
                    <div className={styles.thumbnail}>
                      <a href="">
                        <Image
                          width={192}
                          height={192}
                          src={episode.thumbnail}
                          alt={episode.title}
                          objectFit="cover"
                        />
                      </a>
                    </div>
                  </td>

                  <td>
                    <a href="">{episode.title}</a>
                  </td>
                  <td>{episode.members}</td>
                  <td>{episode.published_at_formated}</td>
                  <td>{episode.file.duration_formated}</td>
                  <td>
                    <button type="button">
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
