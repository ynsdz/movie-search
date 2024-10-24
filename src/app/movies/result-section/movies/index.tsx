import React, { useContext, useEffect, useRef } from "react";
import { MovieSearchResult } from "@/src/types/movies";
import MovieCard from "@/src/components/movie-card";
import { AppContext } from "@/src/context/appContext";


function Movies() {
  const { movies, page: currentPage, setPage, moviesLoading, paginationType  } = useContext(AppContext);
  
  const loaderRef = useRef(null);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (paginationType === "infinite") {
      observer = new IntersectionObserver((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          if (!movies.length) {
            return;
          }
          setPage(currentPage + 1);
        }
      });

      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }
    }


    return () => {
      if (loaderRef.current) {
        observer?.unobserve(loaderRef.current);
      }
    };
  }, [movies, paginationType]);

  return (
    <div>
      {!movies.length && (
        <h1 className="text-2xl p-20 uppercase text-gray-400 text-center">
          YUKLENIYOR...
        </h1>
      )}
      <ul
        className={`grid grid-cols-1 gap-14 lg:grid-cols-2 mx-8 ${
          movies.length ? "" : "h-10"
        }`}
      >
        {movies?.map((movie, index) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isLastChild={
              movies.length - 1 === index || movies.length - 2 === index
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
      {paginationType === "infinite" &&
      <div ref={loaderRef}>{moviesLoading && "..loading"}</div>
      }
    </div>
  );
}

export default Movies;
