"use client";
import { CiSearch } from "react-icons/ci";
import { GoArrowRight } from "react-icons/go";
import React, { useContext } from "react";
import { AppContext } from "../app";
import { useRouter } from "next/navigation";

function InputBar() {
  const { searchValue, setSearchValue } = useContext(AppContext);
  const router = useRouter();

  return (
    <div className="flex justify-center mb-8 items-center">
      <form
        className="relative w-full"
        onSubmit={() => {
          router.push(`/search?searchKeyword=${searchValue}`);
        }}
      >
        <input
          className="border border-gray-300 pr-10 pl-4 py-2 rounded-lg  w-full"
          type="input"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Bir film adi giriniz"
          aria-label="Search"
        />
        <div
          className="absolute inset-y-0 right-0 pr-3  
                    flex items-center
                    pointer-events-none"
        >
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault;
            }}
            className="cursor-pointer"
          >
            {searchValue ? (
              <GoArrowRight className="fill-sky-500" />
            ) : (
              <CiSearch id="button-addon3 " className="fill-sky-500" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputBar;
