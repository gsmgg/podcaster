import type { NextApiResponse } from "next";
import { episodes } from "./_data";

type Episode = {
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
  duration: number;
};
type Error = {
  message: string;
};

export default function episodeHandler(
  { query: { id } }: any,
  res: NextApiResponse<Episode | Error>
) {
  const filtered = episodes.filter((p) => p.id === id);

  // User with id exists
  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res
      .status(404)
      .json({ message: `Episódio de id '${id}' não encontrado :(` });
  }
}
