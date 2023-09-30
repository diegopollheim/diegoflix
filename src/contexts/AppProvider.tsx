import { createContext, useState } from "react";
import useSWR from "swr";
import { FilmeModel } from "../model/filme";

export type AppContenxtTypes = {
  searchMovie: string;
  handleChangeQueryMovie: (query: string) => void;
  currentPage: number;
  handleCurrentPage: (page: number) => void;
  moviesData: {
    filmes: FilmeModel[];
    totalPages: number
  } 

  isValidating: boolean;
};

export const AppContext = createContext<AppContenxtTypes | null>(null);

export default function AppProvider({ children }) {
  const [searchMovie, setSearchMovie] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Busca por filmes total ou com filtro
  const { data: moviesData, isValidating } = useSWR(`/api/filmes?page=${currentPage}&query=${searchMovie}`);

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
        isValidating,
        moviesData,
        currentPage,
        searchMovie,
        handleChangeQueryMovie,
        handleCurrentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
