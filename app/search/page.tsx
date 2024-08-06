"use server";

import React, { useContext } from "react";
import Head from "next/head";
import App from "./components/app";

export default async function Home() {
  return (
    <div className="mt-6 my-6">
      <Head>
        <meta name="description" content="Movie Search" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App apiKey={process.env.API_KEY || ""} />
    </div>
  );
}

export type MovieSearchType = {
  Title: string;
  Year?: string | number;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type MovieSearchResult = {
  Search: Array<MovieSearchType>;
  totalResults: string;
  Response: string;
};
