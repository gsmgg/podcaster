import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type Episodes = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
};

type HomeProps = {
  episodes: Array<Episodes>;
  // Isso equivale a Episodes[];
};

export default function Home(props: HomeProps) {
  return (
    <>
      <h1>Index</h1>
      <code>{JSON.stringify(props.episodes)}</code>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/episodes", {
    params: {
      _limit: 1,
      _sort: "publishe_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episodes: Episodes) => {
    return {
      id: episodes.id,
      title: episodes.title,
      members: episodes.members,
      published_at: episodes.published_at,
      published_at_formated: format(
        parseISO(episodes.published_at),
        "d MMM yy",
        { locale: ptBR }
      ),
      thumbnail: episodes.thumbnail,
      description: episodes.description,
      file: {
        url: episodes.file.url,
        type: episodes.file.type,
        duration: Number(episodes.file.duration),
        duration_formated: convertDurationToTimeString(
          Number(episodes.file.duration)
        ),
      },
    };
  });

  return {
    props: {
      episodes: episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
