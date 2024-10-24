'use client'
import React from "react";
import { MovieSearchType } from "@/src/types/movies";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import viewTransition from "@/src/utils/viewTransition";


function MovieDetails(props: { Movie: MovieSearchType} ) {
  const { Poster, Title, Plot, Year, Runtime, Genre, Director, Writer, imdbRating, Actors} = props.Movie;
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="fixed bg-black left-4 z-10 top-4">
        <button className="text-white  flex items-center font-semibold ">
          <GoArrowLeft className="size-8" onClick={() => {
            viewTransition(() => router.back());
          }} />
        </button>
      </div>
      <section className="absolute max-h-[50%] overflow-hidden lg:max-h-full bottom-0 lg:relative order-1 lg:-order-none flex flex-col lg:h-full lg:p-4 lg:w-1/2 bg-transparent lg:bg-black items-start text-white text-lg  space-y-10">
        <div className="absolute h-full w-full blur-lg bg-black" />
        {/* BLUR */}
        <div className="flex flex-col lg:ml-10 gap-5 h-full z-10 p-4 overflow-auto">
          <header className="flex gap-8 justify-between">
            <p>
              {Runtime} | {Genre} | {Year}
            </p>
            <span className="flex items-baseline ">
              <FaStar className="fill-blue-400" />
              &nbsp;
              <h1 className="text-blue-400 text-2xl	">{imdbRating}</h1>
              <h6 className="text-sm text-gray-500 opacity-80">/10</h6>
            </span>
          </header>
          <h1 className="text-2xl uppercase mb-1 font-black">
            {Title}
          </h1>
          <p>{Plot}</p>
          <footer className="content-end mt-8 flex flex-col gap-2">
            <p>
              <span className="text-blue-400 mr-4">Director</span>
              {Director}
            </p>
            <p>
              <span className="text-blue-400 mr-4">Writers</span>
              {Writer}
            </p>
            <p>
              <span className="text-blue-400 mr-4">Actors</span>
              {Actors}
            </p>
          </footer>
        </div>
      </section>
      <section className="lg:w-1/2 h-full object-fill order-0 lg:order-1">
        <object
          className="h-full w-full"
        >
          <img src={Poster} alt={Title} className="w-full object-fill h-full" />
        </object>
      </section>
    </div>
  );
}
export default MovieDetails;
