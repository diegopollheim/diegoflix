import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { FilmeModel } from "../../../model/filme";

type ResponseData = {
  filmes: FilmeModel[];
  totalPages: number;
};
export default async function FilmesApi(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {

if (req.method !== 'GET') {
  res.send(`Method ${req.method} not found!`)
}

  const { query: searchMovie, page } = req.query;

  let url = searchMovie ? `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&include_adult=false&language=pt-BR&page=${page}`: `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${req.query.page}`

  const options = {
    method: "GET",
    url: url,
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
