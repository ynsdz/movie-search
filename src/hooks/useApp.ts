'use client';
import { useDebouncer } from "@/src/hooks/useDebouncer";
import { MovieSearchResult } from "@/src/types/movies";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AppContextType } from "../types/appContext";
import { usePathname } from "next/navigation";

const LS_QUICK_SEARCH_MOVIE_LIMIT = "LS_QUICK_SEARCH_MOVIE_LIMIT";

export type Props = {
  apiKey: string;
};
export type TPaginationType = "infinite" | "paginate";

export default function useApp(props: Props): AppContextType {
  const isFirstRender = useRef(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [quickSearchMovieLimit, setQuickSearchMovieLimit] = useState(() => {
    const lsLimitValue = localStorage.getItem(LS_QUICK_SEARCH_MOVIE_LIMIT);
    if (!lsLimitValue) return;
    const lsLimit = +JSON.parse(lsLimitValue);;
    return lsLimit ? +lsLimit : 2;
  });
  const [theme, setTheme] = useState('light');
  const [paginationType, setPaginationType] =
    useState<TPaginationType>("paginate");

  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchMovies, setSearchMovies] = useState<MovieSearchResult | null>(
    null
  );

  const [moviesLoading, setMoviesLoading] = useState(false);

  useEffect(() => {
    const search: any = searchParams?.get("searchKeyword");
    setSearchValue(search);
  }, []);

  const providerValue = {
    page,

    searchMovies,
    searchValue,
    
    setPage: (_page: number) => setPage(_page),
    setSearchValue: (value: string) => setSearchValue(value),

    getMovie: async (id: string) => {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=${props.apiKey}&page=${page}`
      );
      return res.json() as unknown as MovieSearchResult;
    },
    getMovies: async (searchValue: string): Promise<MovieSearchResult> => {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchValue}&apikey=${props.apiKey}&page=${page}`
      );
      return res.json();
    },
    setMovies: (movieSearchResult: MovieSearchResult) => {
      setSearchMovies(movieSearchResult);
    },
    getAndSetMovies: async (searchValue: string) => {
      setMoviesLoading(true);
      const mergedMovies: any[] = [];
      const getMoviesResponse = await providerValue.getMovies(searchValue);

      let moviesData = getMoviesResponse.Search;
      // EGER ANASAYFA ISE SADECE 2 ADET GOSTER
      if (pathname === "/") {
        if(typeof moviesData == 'object') moviesData =  moviesData.slice(0, quickSearchMovieLimit);
      }

      const promises: Promise<any>[] = [];

      for (const movie of moviesData) {
        promises.push(providerValue.getMovie(movie.imdbID));
      }

      // for of icinde cekince her filmin detayini cekebilmek icin
      // bir sonrakini beklettigi icin
      // hepsini tek seferde cekip Promise.all yapiyoruz,
      // bu sayede birbirini beklemeyerek daha hizli acilacak
      const movieDetails = await Promise.all(promises);

      moviesData.forEach((movie) => {
        const movieDetail = movieDetails.find((m) => m.imdbID === movie.imdbID);
        if (movieDetail) {
          mergedMovies.push({
            ...movie,
            ...movieDetail,
          });
        }
      });

      if (paginationType === "infinite") {
        // INFINITE SCROLL ISE ONCEKI DATA ILE BIRLESTIR
        providerValue.setMovies({
          totalResults: getMoviesResponse.totalResults,
          Response: getMoviesResponse.Response,
          Search: [...(searchMovies?.Search || []), ...(mergedMovies || [])],
        });
      } else {
        // PAGINATION ISE DIREKT SET ET
        providerValue.setMovies({
          totalResults: getMoviesResponse.totalResults,
          Response: getMoviesResponse.Response,
          Search: mergedMovies,
        });
      }
      setMoviesLoading(false);
    },
  };

  const getData = async () => {
    if (!searchValue) return
    typeof searchValue === 'string' && providerValue.getAndSetMovies(searchValue.trim())
  };

  const debouncedGetData = useDebouncer(() => {
    getData();
  }, 400);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      debouncedGetData();
    }
  }, [searchValue]);

  useEffect(() => {
    getData();
  }, [page, quickSearchMovieLimit]);



  return {
    ...providerValue,
    movies: searchMovies?.Search || [],
    paginationType,
    quickSearchMovieLimit,
    setTheme: (theme: string) => setTheme(theme),
    theme,
    setPaginationType: (value: TPaginationType) => setPaginationType(value),
    setQuickSearchMovieLimit: (limit: number) => setQuickSearchMovieLimit(limit),
    moviesLoading,
  };
}
