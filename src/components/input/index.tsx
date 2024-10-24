"use client";
import { CiSearch } from "react-icons/ci";
import { GoArrowRight } from "react-icons/go";
import React, { useContext } from "react";
import { AppContext } from "@/src/context/appContext";
import { useRouter } from "next/navigation";
import viewTransition from "@/src/utils/viewTransition";

function InputBar() {
  const { searchValue, setSearchValue } = useContext(AppContext);
  const router = useRouter();

  return (
    <div className="flex justify-center mb-8 items-center ">
      <form
        className="relative w-full"
        onSubmit={(e) => {
          e.preventDefault();
          viewTransition(() => router.push(`/movies?searchKeyword=${searchValue}`))
        }}
      >
        <input
          className="border border-gray-300 pr-10 pl-4 py-2 rounded-lg  w-full"
          type="input"
          value={searchValue || ""}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Bulmak istedigin filmini adini yaz"
          aria-label="Search"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
        >
          <button type="submit" className="cursor-pointer">
            {searchValue ? (
              <GoArrowRight className="fill-blue-500 pointer-events-auto md:h-12 md:w-14 h-4 w-6" />
            ) : (
              <CiSearch className="fill-blue-500 md:h-12 md:w-12 h-6 w-6" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputBar;
