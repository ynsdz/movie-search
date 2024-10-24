import React from 'react'
import MovieDetails from '@/src/app/movies/[id]/movie-details';
import { MovieSearchType } from '@/src/types/movies';
import { redirect, } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  let movie;

  try {
    let data = await fetch( `http://www.omdbapi.com/?i=${params.id}&apikey=${process.env.API_KEY}&`);
    data = await data.json();
    console.log("try",(data as any).Error);
    if ((data as any).Error) {
      throw Error;
    }
    movie = data as unknown as MovieSearchType;

  } catch {
    redirect("/");
  }

  return (
    <div>
      <MovieDetails Movie={movie} />
    </div>
  );
}