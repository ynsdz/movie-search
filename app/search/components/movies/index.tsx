"use client";

import React, { useEffect, useRef, useState } from "react";
import { MovieSearchResult } from "@/app/search/page";
import MovieCard from "./movie-card";

type Props = {
  movies: MovieSearchResult["Search"];
  currentPage: number;
  totalPage: number;
  setPage: (page: number) => void;
};

function Movies(props: Props) {
  const { currentPage, setPage } = props;
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (!props.movies.length) {
          return;
        }
        setPage(currentPage + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [props.movies]);

  const moviesArrayLength = props.movies.length;
  return (
    <div>
      <ul className="grid grid-cols-1 gap-14 lg:grid-cols-2 mx-8">
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
        <button
          className="text-blue-500 py-4 px-8  block w-full text-center "
          onClick={function () {
            window.scrollTo({
              behavior: "smooth",
              top: 0,
              left: 0,
            });
          }}
        >
          Basa Don
        </button>
      </footer>
      {/* <div ref={loaderRef}>{loading && "..loading"}</div> */}
    </div>
  );
}

export default Movies;
