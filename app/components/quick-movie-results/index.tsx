"use client";

import React, { useContext } from "react";
import { MovieSearchResult } from "@/app/search/page";
import MovieCard from "./movie-card";
import Link from "next/link";
import { AppContext } from "../app";

type Props = {
  movies: MovieSearchResult["Search"];
};

function Movies(props: Props) {
  const movies = props.movies.slice(0, 2);
  const { searchValue } = useContext(AppContext);

  return (
    <div className="max-w-[570px] bg-white rounded-lg pt-8 shadow ">
      <ul className="grid grid-cols-1 gap-8 px-8">
        {movies?.map((movie, index) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isLastChild={movies.length - 1 === index}
          />
        ))}
      </ul>
      <footer className="border-t flex justify-center align-center">
        <Link
          href={{
            pathname: "search",
            query: {
              title: searchValue,
            },
          }}
          className="text-blue-500 py-4 px-8  block w-full text-center"
        >
          DAHA FAZLA SONUC
        </Link>
      </footer>
    </div>
  );
}

export default Movies;
