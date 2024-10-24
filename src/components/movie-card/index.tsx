


import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { MovieSearchResult, MovieSearchType } from "@/src/types/movies";
import HighLighter from "@/src/components/highlighter";
import { useRouter } from "next/navigation";
import viewTransition from "@/src/utils/viewTransition";
import { AppContext } from "@/src/context/appContext";

type Props = {
  isLastChild?: boolean;
  movie: MovieSearchType;
  ref: any;
};

const MovieCard = React.forwardRef<Props, any>((props, ref) => {
  const router = useRouter();
  const { movie } = props;
  const { searchValue } = useContext(AppContext);
;

  const pathname = `/movies/${movie.imdbID}`;

  
  const handleClick = (e: any) => {
    viewTransition(() => router.push(pathname))
  };
  
  const poster = (
    <div className="sm:col-span-4 col-span-12">
      {movie.Poster && movie.Poster !== "N/A" ? (
        <Link href={{ pathname }} onClick={handleClick}>
          <img
            src={movie.Poster}
            alt={`${movie.Title}`}
            className="block object-cover h-full ml-auto mr-auto"
          />
        </Link>
      ) : (
        <svg
          className="w-full h-full text-gray-400"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Image_Off">
            <path d="M19.937,14.218l0,-8.654c0,-0.829 -0.672,-1.5 -1.5,-1.5l-10.628,-0c-0.276,-0 -0.5,-0.225 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5l10.628,-0c1.38,-0 2.5,1.118 2.5,2.5l0,10.624c0,0.276 -0.224,0.5 -0.5,0.501c-0.276,-0 -0.5,-0.225 -0.5,-0.5l0,-0.556l-4.583,-4.584c-0.456,-0.456 0.251,-1.163 0.707,-0.707c0.162,0.162 2.37,2.37 3.876,3.876Zm-0.121,6.304c-0.395,0.262 -0.869,0.415 -1.379,0.415l-12.874,-0c-1.381,-0 -2.5,-1.119 -2.5,-2.5l0,-12.873c0,-0.51 0.153,-0.984 0.414,-1.38l-0.263,-0.263c-0.456,-0.456 0.251,-1.163 0.707,-0.707c0.088,0.088 0.176,0.176 0.263,0.263c0.245,0.245 16.095,16.094 16.339,16.338l0.263,0.263c0.455,0.456 -0.252,1.163 -0.707,0.707c-0.088,-0.087 -0.175,-0.175 -0.263,-0.263Zm-11.104,-11.103l-2.001,-2.001c-0.094,0.196 -0.146,0.415 -0.146,0.647c-0,0.829 0.672,1.5 1.5,1.5c0.232,-0 0.451,-0.052 0.647,-0.146Zm-2.733,-2.733l-1.77,-1.77c-0.093,0.196 -0.146,0.416 -0.146,0.648l0,10.717l1.926,-1.926c0.587,-0.586 1.536,-0.586 2.122,-0l0.555,0.554c0.195,0.196 0.511,0.196 0.706,0l2.415,-2.415l-2.343,-2.343c-0.395,0.262 -0.869,0.414 -1.379,0.414c-1.38,-0 -2.5,-1.119 -2.5,-2.5c-0,-0.509 0.152,-0.983 0.414,-1.379Zm-1.916,11.009l0,0.741c0,0.829 0.671,1.5 1.5,1.5l12.874,0c0.232,0 0.451,-0.052 0.647,-0.145c-0.165,-0.165 -3.264,-3.263 -6.59,-6.59l-2.414,2.415c-0.585,0.586 -1.537,0.586 -2.122,0l-0.554,-0.554c-0.195,-0.196 -0.512,-0.196 -0.708,0l-2.633,2.633Z"></path>
          </g>
        </svg>
      )}
    </div>
  );

  const header = (
    <Link href={{ pathname }} onClick={handleClick}>
      <div className="card-header">
        <h3 className="text-black text-xl">
          <HighLighter
            text={movie.Title}
            highlight={searchValue}
            highlightedItemClass="highlight"
          />
          ({movie.Year})
        </h3>
        <span className="flex items-baseline justify-center sm:justify-normal">
          <FaStar className="fill-blue-400" />
          <h1 className="text-blue-400 text-2xl">{movie.imdbRating}</h1>
          <h6 className="text-sm text-gray-500 opacity-80">/ 10</h6>
        </span>
      </div>
    </Link>
  );

  const cardMain = (
    <div className="card-main">
      <div>Dil: {movie.Language} </div>
      <div>
        Oyuncular: {movie.Actors}&nbsp;|&nbsp;
        <Link className="underline" href={{ pathname }} onClick={handleClick}>
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
          href={{ pathname }}
          onClick={handleClick}
        >
          Detaylar{" "}
        </Link>
      </div>
    </div>
  );

  return (
    <div
      className={`relative text-center sm:text-left ${
        props.isLastChild ? "" : "border-b"
      }`}
    >
      <div className="grid h-full grid-cols-12  gap-x-3 flex-row sm:max-w-xl sm:mx-auto  content-center pb-8">
        {poster}
        <div className="col-span-12 sm:col-span-8 card-right space-y-4">
          {header}
          {cardMain}
          {cardBottom}
        </div>
      </div>
    </div>
  );
});

export default MovieCard;