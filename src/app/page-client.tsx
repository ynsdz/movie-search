'use client'

import React from "react";

import useApp from "@/src/hooks/useApp";
import { AppContext } from "@/src/context/appContext";

import { IApiKey } from "@/src/types/apiKey";

import InputBar from "@/src/components/input";
import QuickMovieResults from "./quick-movie-results";
import Settings from "../components/settings";


function PageClient( props: IApiKey)  {
  const useAppValue = useApp({
    apiKey: props.apiKey,
  });
  const { movies} = useAppValue;
  const sectionClassName = `h-[calc(100vh-4rem)] overflow-auto flex m-8 bg-[#F7F9FD] dark:bg-[#35373b] p-12 transition-transform ${
    movies?.length ? "items-start" : "items-center"
  }`;


  return (
    <AppContext.Provider value={useAppValue}>
      <section className={sectionClassName} >
        <main className="flex flex-col max-w-[570px] xl:max-w-full xl:w-1/2 mx-auto w-full">
          <Settings></Settings>
          <InputBar />
          {!!movies.length && <QuickMovieResults movies={movies || []} />}
        </main>
      </section>
    </AppContext.Provider>
  );
}

export default PageClient;
