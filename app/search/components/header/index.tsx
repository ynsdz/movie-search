"use client";
import React from "react";

type ResultHeaderProps = {
  searchKeyword: string;
  resultCount: number;
};

function ResultHeader(props: ResultHeaderProps) {
  const { searchKeyword, resultCount } = props;

  return (
    <>
      <div className="sm:hidden flex md:w-1/2 mx-auto mb-8 md:text-lg items-center justify-between border-b border-blue-400">
        <div className="m-4 text-blue-400">{searchKeyword} icin sonuclar</div>
        <div className="m-4 text-gray-400">({resultCount})</div>
      </div>
      <div className="sm:flex hidden md:w-1/2 mx-auto mb-8 md:text-lg items-center justify-between border-b border-blue-400">
        <div className="m-4 text-blue-400">{searchKeyword} icin sonuclar</div>
        <div className="m-4 text-gray-400">{resultCount} film bulundu </div>
      </div>
    </>
  );
}

export default ResultHeader;
