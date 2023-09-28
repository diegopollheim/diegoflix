import {createContext, useEffect, useState} from "react";
import useSWR from "swr";
import {FilmeModel} from "../model/filme";

export type AppContenxtTypes = {
  searchMovie: string;
  handleChangeQueryMovie: (query: string) => void;
  totalPages: number;
  currentPage: number;
  handleCurrentPage: (page: number) => void;
  movies: FilmeModel[];

  isLoading: boolean;
};

export const AppContext = createContext<AppContenxtTypes | null>(null);

export default function AppProvider({children}) {
  const [searchMovie, setSearchMovie] = useState<string>("");

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {data: moviesData, isValidating: validandoTodosFilmes} = useSWR(
    `/api/filmes?page=${currentPage}`
  );

  // Busca por filmes apenas quando houver um valor de busca
  const {data: filteredMoviesData, isValidating: validandoFilmesFiltrados} = useSWR(
    searchMovie ? `/api/filmes/search?page=${currentPage}&query=${searchMovie}` : null
  );

  let isLoading = validandoTodosFilmes || validandoFilmesFiltrados;

  // Define o total de páginas baseado no campo de busca
  useEffect(() => {
    if (searchMovie?.length) {
      setTotalPages(filteredMoviesData?.totalPages);
    } else {
      setTotalPages(moviesData?.totalPages);
    }
  }, [moviesData, filteredMoviesData]);

  // Define a lista de filmes que é mostrada
  let movies = searchMovie ? filteredMoviesData?.filmes : moviesData?.filmes;

  // Atualiza o estado de pesquisa por filme
  const handleChangeQueryMovie = (query: string) => {
    setSearchMovie(query);
  };

  // Define a página atual mostra
  const handleCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        movies,
        currentPage,
        totalPages,
        searchMovie,
        handleChangeQueryMovie,
        handleCurrentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
