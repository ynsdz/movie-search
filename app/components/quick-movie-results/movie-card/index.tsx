"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { MovieSearchResult, MovieSearchType } from "@/app/search/page";
import { AppContext } from "../../app";

type Props = {
  isLastChild?: boolean;
  movie: MovieSearchType;
};

function MovieCard(props: Props) {
  const { getMovie, searchValue } = useContext(AppContext);
  const [movieDetail, setMovieDetail] = useState<null | MovieSearchResult>(
    null
  );

  useEffect(() => {
    const _getMovie = async () => {
      const movieDetail = await getMovie(movie.imdbID);
      setMovieDetail(movieDetail);
    };
    _getMovie();
  }, [searchValue]);

  // console.log("movie", movieDetail);
  const movie = { ...props.movie, ...movieDetail };

  const poster = (
    <div className=" col-span-4">
      <img
        src={movie.Poster}
        alt={`${movie.Title} broken image`}
        className="block object-cover h-full "
      />
    </div>
  );

  const header = (
    <div className="card-header">
      <h3 className="text-black text-xl	">
        {movie.Title} ({movie.Year})
      </h3>
      <span className="flex items-baseline">
        <FaStar className="fill-blue-400" />
        &nbsp;
        <h1 className="text-blue-400 text-2xl	">{movie.imdbRating}</h1>
        <h6 className="text-sm text-gray-500 opacity-80">/10</h6>
      </span>
    </div>
  );

  const cardMain = (
    <div className="card-main">
      <div>Dil: {movie.Language} </div>
      <div>
        Oyuncular: {movie.Actors}&nbsp;|&nbsp;
        <Link
          className="underline"
          href={`https://www.imdb.com/title/${movie.imdbID}/fullcredits`}
        >
          Tüm Listeyi gör{" "}
        </Link>
      </div>
    </div>
  );

  const cardBottom = (
    <div className="card-bottom">
      <div>
        {movie.Plot}
        &nbsp; &nbsp;{" "}
        <Link
          className="underline"
          href={`https://www.imdb.com/title/${movie.imdbID}`}
        >
          Detaylar{" "}
        </Link>
      </div>
    </div>
  );

  return (
    <div className={`relative ${props.isLastChild ? "" : "border-b"}`}>
      <div className="grid h-full grid-cols-12 gap-x-3 flex-row sm:max-w-xl sm:mx-auto  content-center pb-8">
        {poster}
        <div className="col-span-8 card-right space-y-4">
          {header}
          {cardMain}
          {cardBottom}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
