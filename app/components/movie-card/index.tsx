import React from "react";
import Link from "next/link";
import { MovieSearchType } from "../../page";

type Props = {
  movie: MovieSearchType;
};

function MovieCard(props: Props) {
  const { movie } = props;

  return (
    <div className="flex gap-4 flex-row">
      <div className="aspect-w-16 aspect-h-9 ">
        <img src={movie.Poster} alt="test" className="object-cover" />
      </div>
      <div className="">
        <h3 className="text-black text-lg">{movie.Title}</h3>
        <span></span>
        <Link href="">Detaylar </Link>
      </div>
    </div>
  );
}

export default MovieCard;
