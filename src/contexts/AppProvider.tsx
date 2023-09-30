import { createContext, useState } from "react";
import useSWR from "swr";
import { FilmeModel } from "../model/filme";

export type MovieContextTypes = {
  searchMovie: string;
  handleChangeQueryMovie: (query: string) => void;
  currentPage: number;
  handleCurrentPage: (page: number) => void;
  dataMovies: {
    filmes: FilmeModel[];
    totalPages: number;
  };

  isValidating: boolean;
};

export const MoviesContext = createContext<MovieContextTypes | null>(null);

export default function AppProvider({ children }) {
  const [searchMovie, setSearchMovie] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  let urlAllMovies = `${process.env.NEXT_PUBLIC_BASE_URL}/allMovies?page=${currentPage}`;
  let urlAllMoviesSearch = `${process.env.NEXT_PUBLIC_BASE_URL}/allMoviesSearch?page=${currentPage}&search=${searchMovie}`;
  // Busca por filmes total ou com filtro

  const { data: dataMovies, isValidating } = useSWR(
    searchMovie ? urlAllMoviesSearch : urlAllMovies
  );

  // Atualiza o estado de pesquisa por filme
  const handleChangeQueryMovie = (query: string) => {
    setSearchMovie(query);
  };

  // Define a página atual mostra
  const handleCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MoviesContext.Provider
      value={{
        isValidating,
        dataMovies,
        currentPage,
        searchMovie,
        handleChangeQueryMovie,
        handleCurrentPage,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
