import type { NextApiRequest, NextApiResponse } from "next";
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

type Sort = "title" | "members" | "duration" | "published_at";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Episode[]>
) {
  let _sort = req.query._sort as Sort;
  let _order = (req.query._order as string) || "desc";
  let _limit = (Number(req.query._limit) as number) || episodes.length;

  format(episodes).then((episodes) => {
    res.status(200).json(episodes);
  });

  function format(episodes: Episode[]) {
    return new Promise<Episode[]>((resolve, reject) => {
      if (_sort && _order) {
        let index = _order == "desc" ? 1 : -1;

        episodes.sort((a, b) =>
          a[_sort] > b[_sort] ? -index : b[_sort] > a[_sort] ? index : 0
        );
      }

      resolve(episodes.slice(0, _limit));
    });
  }
}
