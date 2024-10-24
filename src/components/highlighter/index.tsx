import React from "react";

type Props = {
  text: string;
  highlight: string;
  highlightedItemClass: string;
};

const HighLighter = ({ text, highlight }: Props) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <>
      {" "}
      {parts.map((part, i) => {
        const highlightStyle =
          part.toLowerCase() === highlight?.toLowerCase()
            ? "font-bold underline"
            : "";
        return (
          <span key={i} className={highlightStyle}>
            {part}
          </span>
        );
      })}{" "}
    </>
  );
};

export default HighLighter;
