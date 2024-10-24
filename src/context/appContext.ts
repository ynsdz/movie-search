import { createContext } from "react";
import { MovieSearchResult } from "../types/movies";
import { AppContextType } from "../types/appContext";

const AppContextInitialValue: AppContextType = {
  page: 1,
  searchValue: "",
  searchMovies: {} as MovieSearchResult,
  setPage: () => {},

  getMovie: async () => {
    return {} as MovieSearchResult;
  },

  getMovies: async () => {
    return {} as MovieSearchResult;
  },

  setMovies: async () => {
    return {} as MovieSearchResult;
  },

  getAndSetMovies: async (searchValue: string) => {
    return;
  },
  movies: [],
  setSearchValue: (value: string) => {},

  setPaginationType: () => {},
  paginationType: "paginate",

  setQuickSearchMovieLimit: () => {},
  quickSearchMovieLimit: 2,

  theme: "light",
  setTheme: () => {},

  moviesLoading: false,
};



export const AppContext = createContext<AppContextType>(AppContextInitialValue);

