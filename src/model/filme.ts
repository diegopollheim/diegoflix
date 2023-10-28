export type FilmeModel = {
  id: number;
  image: string;
  title: string;
  note: number;
  releaseDate: Date
}
export type FilmeDetailsModel = {
  title: string;
  sinopse: string;
  popularity: number
  imageCapa: string;
  imageThumb: string;
  year: number;
  trailerKey: string
}