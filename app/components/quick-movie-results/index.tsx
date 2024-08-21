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
  return (
    <div className="max-w-[570px] bg-white rounded-lg pt-8 shadow ">
      <RenderMovies movies={movies} />
      <Footer />
    </div>
  );
}

export default Movies;

const RenderMovies = (props: Props) => {
  return (
    <ul className="grid grid-cols-1 gap-8 px-8">
      {props.movies?.map((movie, index) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isLastChild={props.movies.length - 1 === index}
        />
      ))}
    </ul>
  );
};

const Footer = () => {
  const { searchValue } = useContext(AppContext);
  return (
    <footer className="border-t flex justify-center align-center sticky -bottom-16 bg-white ">
      <Link
        href={{
          pathname: "search",
          query: {
            searchKeyword: searchValue,
          },
        }}
        className="text-blue-500 py-4 px-8  block w-full text-center"
      >
        DAHA FAZLA SONUC
      </Link>
    </footer>
  );
};
