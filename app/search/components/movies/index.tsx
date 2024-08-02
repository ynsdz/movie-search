"use client";

import React from "react";
import { MovieSearchResult, MovieSearchType } from "@/app/search/page";
import MovieCard from "./movie-card";

type Props = {
  movies: MovieSearchResult["Search"];
};

function Movies(props: Props) {
  const moviesArrayLength = props.movies.length;
  return (
    <div>
      <ul className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        {props.movies?.map((movie, index) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isLastChild={
              moviesArrayLength - 1 === index || moviesArrayLength - 2 === index
            }
          />
        ))}
      </ul>
      <footer className="border-t flex justify-center align-center">
        <button className="text-blue-500 py-4 px-8  block w-full text-center">
          Basa Don
        </button>
      </footer>
    </div>
  );
}

export default Movies;
