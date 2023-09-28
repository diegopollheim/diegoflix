import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { FilmeModel } from "../../../model/filme";

type ResponseData = {
  filmes: FilmeModel[];
  totalPages: number;
};

export default async function FilmesApi(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${req.query.page}`,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    let filmes: FilmeModel[] = [];

    response.data.results.forEach((filme) => {
      filmes.push({
        id: filme.id,
        title: filme.title,
        image: filme.poster_path,
        note: filme.vote_average,
        releaseDate: filme.release_date,
      });
    });

    res.status(200).json({ filmes, totalPages: response.data.total_pages });
  } catch (error) {
    console.log("[ERROR]", error);
    res.status(500).json(error);
  }
}
