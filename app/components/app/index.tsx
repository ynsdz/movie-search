"use client";

import { MovieSearchResult, MovieSearchType } from "@/app/search/page";
import React, { createContext, useState, useEffect } from "react";
import InputBar from "../input";
import QuickMovieResults from "../quick-movie-results";
import { useDebouncer } from "@/app/hooks/useDebouncer";

type AppContextType = {
  searchValue?: string;
  setSearchValue?: any;
  getMovie: (id: string) => Promise<MovieSearchResult>;
  getMovies: (searchValue: string) => Promise<MovieSearchResult>;
};

const AppContextInitialValue = {
  // searchValue: "",
  setSearchValue: (value: string) => {},

  // movies: [],
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
  const [searchValue, setSearchValue] = useState("");
  const [searchMovies, setSearchMovies] = useState<MovieSearchResult | null>(
    null
  );

  const providerValue = {
    searchValue,
    setSearchValue,
    movies: searchMovies,
    getMovie: async (id: string) => {
      const res = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=${props.apiKey}`
      );
      return res.json() as unknown as MovieSearchResult;
    },
    getMovies: async (searchValue: string) => {
      // console.log("getmovies: ", searchValue);
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchValue}&apikey=${props.apiKey}&page=1`
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
    providerValue.getAndSetMovies(searchValue.trim());
  };
  const debouncedGetData = useDebouncer(() => {
    getData();
  }, 300);

  useEffect(() => {
    debouncedGetData();
  }, [searchValue]);

  return (
    <AppContext.Provider value={providerValue}>
      <section className="m-8 bg-[#F7F9FD] p-12 ">
        <main className="flex flex-col max-w-[570px] mx-auto">
          <InputBar />
          {searchMovies?.Search ? (
            <QuickMovieResults movies={searchMovies?.Search || []} />
          ) : (
            <></>
          )}
        </main>
      </section>
    </AppContext.Provider>
  );
}

export default App;
