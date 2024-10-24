"use client";

import React, { useContext } from "react";
import { MovieSearchResult } from "@/src/types/movies";

import Link from "next/link";
import { AppContext } from "@/src/context/appContext";
import MovieCard from "@/src/components/movie-card";

type Props = {
  movies: MovieSearchResult["Search"];
};

function QuickMovieResults(props: Props) {
  const { quickSearchMovieLimit } = useContext(AppContext);
  const movies = props.movies.slice(0, quickSearchMovieLimit);
  return (
    <>
      {!!movies.length && (
        <div className="bg-white rounded-lg pt-8 shadow ">
          <RenderMovies movies={movies} />
          <Footer />
        </div>
      )}
    </>
  );
}

export default QuickMovieResults;

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
          pathname: "movies",
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
