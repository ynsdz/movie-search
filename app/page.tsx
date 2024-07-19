import Head from "next/head";
import { CiSearch } from "react-icons/ci";
import InputBar from "./components/input";
import { useState, useEffect } from "react";
import MovieCard from "./components/movie-card/";
import Link from "next/link";
import ApiTest from "./api/route";

// export async function getServerSideProps() {
//   try {
//     const res = await fetch(
//       "http://www.omdbapi.com/?i=tt3896198&apikey=bfb2b55a"
//     ); // Dış API endpoint'i
//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: error,
//       },
//     };
//   }
// }

// useEffect(() => {
//   (async () => {
//     const res = await fetch(
//       "http://www.omdbapi.com/?i=tt3896198&apikey=bfb2b55a"
//     );
//     const data = await res.json();
//     console.log(data);
//   })();
// }, []);
const getData = async () => {
  const res = await fetch(
    "http://www.omdbapi.com/?s=avenger&apikey=bfb2b55a&page=1&y=true"
  );

  return res.json();
};

export type MovieText = {
  Title: string;
  Year: string;
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

export type MovieSearchType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MovieSearchResult = {
  Search: Array<MovieSearchType>;
  totalResults: string; // "213"
  Response: string; // True
};

export default async function Home() {
  let data = await getData();
  const movies = (data as MovieSearchResult).Search;
  // console.log(data);

  return (
    <div className=" ml-6 mr-6">
      <Head>
        <meta name="description" content="Movie Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col">
        <div>
          <span className="flex  justify-center mb-8">
            <input
              className="p-4 border border-gray-300 rounded-md"
              type="text"
              placeholder="Bulmak istediğiniz filmin adını yazınız"
            />
            <button>
              <CiSearch />
            </button>
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-14 ">
          {movies?.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </ul>
        {/* / <InputBar></InputBar> */}
      </main>

      {/* <ApiTest movies={movies}></ApiTest> */}
    </div>
  );
}

// <div className="card-left">
//       <img src="" alt="test" />
//     </div>
//     <div className="card-right">
//       <h3>Movie name</h3>
//       <h6>Dil: Ingilzie</h6>
//       <h6>Oyuncular: feawf</h6>| <Link href="_blank">Tum listeyi gor</Link>
//       <h6> movie detail</h6>
//       <Link href="">Detaylar </Link>
//     </div>
