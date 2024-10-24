'use client'
import { AppContext } from "@/src/context/appContext";
import { TPaginationType } from "@/src/hooks/useApp";
import { appendFile } from "fs";
import { stringify } from "querystring";
import React, { useContext, useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { paginationType, setPaginationType, quickSearchMovieLimit, setQuickSearchMovieLimit, theme, setTheme} =  useContext(AppContext);


  useEffect(()=>{
    localStorage.setItem(
      "LS_QUICK_SEARCH_MOVIE_LIMIT",
      JSON.stringify(quickSearchMovieLimit)
    );
  },[quickSearchMovieLimit])
  
  const paginationTypeOptions = [
    {
      label: "Infinite Scroll",
      value: "infinite",
    },
    {
      label: "Pagination",
      value: "paginate",
    },
  ];
  // const [listType, setListType] = useState<string[]>(["Series", "Movies", "All"]);

  if (!isOpen) return null;

  const toggleTheme = () => {
    const changedTheme = theme === "light" ? "dark" : "light";
    setTheme(changedTheme);
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-white dark:bg-black rounded-lg p-6 w-96`}
      >
        <div className="flex justify-between items-center mb-4">
          <label className="text-gray-700 dark:text-gray-300">
            Gündüz/Gece Modu
          </label>
          {/* <input
            type="checkbox"
            checked={isDarkMode}
            onChange={()=> { toggleTheme; console.log('isdark', isDarkMode)}}
            className="toggle-checkbox hidden"
          />
          <label className="toggle-label bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full flex items-center cursor-pointer">
            <span
              className={`toggle-dot bg-white dark:bg-gray-400 w-6 h-6 rounded-full shadow-md transform ${
                isDarkMode ? "translate-x-6" : ""
              }`}
            ></span>
          </label> */}
          <div className="dark:text-white">
            <button onClick={() => toggleTheme()}>
              {theme === 'dark' && <IoSunny />}
              {theme === 'light' && <IoMoon />}
            </button>
          </div>
        </div>

        {/* listeleme adedi*/}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Kac Oneri Gosterilsin (2-6):
          </label>
          <select
            value={quickSearchMovieLimit}
            onChange={(e) => {
              setQuickSearchMovieLimit(e.target.value as any);
            }}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
          >
            {[2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* page type*/}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Sayfalama Türünü Seçin:
          </label>
          <select
            value={paginationType}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md browser-default custom-select"
            onChange={(e) => {
              setPaginationType(e.target.value as TPaginationType);
            }}
          >
            {paginationTypeOptions.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Film\ Dizi tiplerini goster*/}
        {/* <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Gormek istedigniz Listeyi Secin:
          </label>
          <select
            onChange={(e) => handlepageTypeChange(e)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md browser-default custom-select"
          >
            {Add.map((address, key) => (
              <option key={key} value={key}>
                {address}
              </option>
            ))}
          </select>
        </div> */}

        {/* kapatma butonu */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default Modal;
