import { TPaginationType } from "../hooks/useApp";
import { MovieSearchResult, MovieSearchType } from "../types/movies";

type TSetPage = (page: number) => void;
type TSetTheme = (theme: string) => void;
type TSetSearchValue = (value: string) => void;
type TGetMovie = (id: string) => Promise<MovieSearchResult>;
type TGetMovies = (searchValue: string) => Promise<MovieSearchResult>;
type TSetMovies = (movieSearchResult: MovieSearchResult) => void;
type TGetAndSetMovies = (searchValue: string) => Promise<void>;
type TSetQuickSearchMovieLimit = (quickSearchMovieLimit: TQuickSearchMovieLimit) => void;
type TQuickSearchMovieLimit = number ;

export type AppContextType = {
  setPage: TSetPage;
  searchMovies: MovieSearchResult | null;
  searchValue: string;
  setSearchValue: TSetSearchValue;
  page: number;

  getMovie: TGetMovie;
  getMovies: TGetMovies;
  setMovies: TSetMovies;
  getAndSetMovies: TGetAndSetMovies;

  movies: MovieSearchType[];

  paginationType: TPaginationType;
  setPaginationType: (value: TPaginationType) => void;

  quickSearchMovieLimit?: TQuickSearchMovieLimit;
  setQuickSearchMovieLimit: TSetQuickSearchMovieLimit;

  theme: string;
  setTheme: TSetTheme;
  

  moviesLoading: boolean;
};
