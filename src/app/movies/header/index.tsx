"use client";
import viewTransition from "@/src/utils/viewTransition";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";

type HeaderProps = {
  searchKeyword: string;
  resultCount: number;
};

function Header(props: HeaderProps) {
  const { searchKeyword, resultCount = 0 } = props;
  const router = useRouter();

  return (
    <>
      <div className="sm:hidden flex md:w-1/2 mx-auto mb-8 md:text-lg items-center justify-between border-b border-blue-400">
        <div className="m-4 text-blue-400">{searchKeyword} icin sonuclar</div>
        <div className="m-4 text-gray-400">({resultCount})</div>
        <CiSearch
          onClick={() => viewTransition(() => router.push("/"))}
          className="fill-blue-500 pointer-events-auto md:h-12 md:w-14 h-4 w-6"
        />
      </div>
      <div className="sm:flex hidden md:w-4/6 mx-auto mb-8 md:text-lg items-center justify-between border-b border-blue-400">
        <div className="m-4 text-blue-400">{searchKeyword} icin sonuclar</div>
        <div className="m-4 text-gray-400">{resultCount} film bulundu </div>
        <div
          className="flex flex-row justify-center items-center"
          onClick={() => viewTransition(() => router.push("/"))}
        >
          <div className="text-gray-400">Baska bir arama yap</div>
          <CiSearch className="text-gray-400 pointer-events-auto md:h-8 md:w-14 h-4 w-6" />
        </div>
      </div>
    </>
  );
}

export default Header;
