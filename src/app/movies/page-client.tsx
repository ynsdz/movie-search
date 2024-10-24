'use client'

import React from "react";
import Movies from "./result-section/movies";
import Header from "./header";
import Pagination from "@/src/components/pagination";
import useApp from "@/src/hooks/useApp";
import { AppContext } from "@/src/context/appContext";
import Settings from "@/src/components/settings";

type Props = {
  apiKey: string;
};


function App(props: Props) {
  const useAppValue = useApp({
    apiKey: props.apiKey,
  });
  const { searchValue, page, setPage, searchMovies, paginationType } = useAppValue;

  const moviesArrayLength = Number(searchMovies?.totalResults);
  const totalPage = Math.ceil(moviesArrayLength / 10);

  return (
    <AppContext.Provider value={useAppValue}>
      <main className="flex flex-col bg-[#F7F9FD] lg:m-8 overflow-hidden">
        <Settings />

        <Header searchKeyword={searchValue} resultCount={moviesArrayLength} />
        <Movies />
        <div className="flex justify-center mb-4">
          {paginationType === "paginate" &&
          <Pagination
          hasPrev={page > 1}
          hasNext={totalPage > 1 && page < totalPage}
          currentPage={page}
          setPage={setPage}
          totalPage={totalPage}
          />
        }
        </div>
      </main>
    </AppContext.Provider>
  );
}

export default App;
