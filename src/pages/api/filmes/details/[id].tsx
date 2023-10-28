import type {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import dayjs from "dayjs";
import {FilmeDetailsModel} from "../../../../model/filme";

export default async function FilmesApi(
  req: NextApiRequest,
  res: NextApiResponse<FilmeDetailsModel>
) {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${req.query.id}?language=pt-BR`,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
  };

  try {
    const response = await axios.request(options);

    let retorno: FilmeDetailsModel = {
      title: response.data.title,
      sinopse: response.data.overview,
      popularity: response.data.popularity,
      imageCapa: response.data.poster_path,
      imageThumb: response.data.backdrop_path,
      year: parseInt(dayjs(response.data.release_date).format("YYYY")),
      trailerKey: ''
    };

    res.status(200).json(retorno);
  } catch (error) {
    console.log("[ERROR]", error);
    res.status(500).json(error);
  }
}
