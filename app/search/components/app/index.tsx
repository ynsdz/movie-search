"use client";

import { MovieSearchResult } from "@/app/search/page";
import React, { createContext, useState, useEffect } from "react";
import Movies from "../movies";
import { useDebouncer } from "@/app/hooks/useDebouncer";
import { useSearchParams } from "next/navigation";
import ResultHeader from "../header";

type AppContextType = {
  searchValue?: string;
  setSearchValue?: any;
  getMovie: (id: string) => Promise<MovieSearchResult>;
  getMovies: (searchValue: string) => Promise<MovieSearchResult>;
};

const AppContextInitialValue = {
  setSearchValue: (value: string) => {},
  getMovie: async (id: string) => {
    return {} as MovieSearchResult;
  },
  getMovies: async (searchValue: string) => {
    return {} as MovieSearchResult;
    [];
  },
};

export const AppContext = createContext<AppContextType>(AppContextInitialValue);

type Props = {
  apiKey: string;
};

function App(props: Props) {
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchMovies, setSearchMovies] = useState<MovieSearchResult | null>(
    null
  );

  useEffect(() => {
    const search: any = searchParams.get("searchKeyword");
    setSearchValue(search);
  }, []);

  const providerValue = {
    searchValue,
    setSearchValue,
    pageNumber,
    movies: searchMovies,
    getMovie: async (id: string) => {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=${props.apiKey}&page=${pageNumber}`
      );
      return res.json() as unknown as MovieSearchResult;
    },
    getMovies: async (searchValue: string) => {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchValue}&apikey=${props.apiKey}&page=${pageNumber}`
      );
      return res.json() as unknown as MovieSearchResult;
    },
    setMovies: (movieSearchResult: MovieSearchResult) => {
      setSearchMovies(movieSearchResult);
    },
    getAndSetMovies: async (searchValue: string) => {
      const movies = await providerValue.getMovies(searchValue);
      providerValue.setMovies(movies);
    },
  };

  const getData = async () => {
    await providerValue.getAndSetMovies(searchValue.trim());
  };
  const debouncedGetData = useDebouncer(() => {
    getData();
  }, 300);

  useEffect(() => {
    debouncedGetData();
  }, [searchValue]);

  const movies = searchMovies?.Search || [];

  return (
    <AppContext.Provider value={providerValue}>
      <main className="flex flex-col bg-[#F7F9FD] m-16 overflow-hidden ">
        <ResultHeader searchKeyword={searchValue} resultCount={movies.length} />
        <Movies movies={movies} />
      </main>
    </AppContext.Provider>
  );
}

export default App;
