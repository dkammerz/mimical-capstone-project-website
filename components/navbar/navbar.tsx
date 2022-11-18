import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

// Usual navbar as learned in previous lessons
// For CSS usualy I use TailwindCSS
// The navbar is split into desktop and mobile view

const navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div
      style={{ backgroundColor: "#060621" }}
      className="fixedleft-0 top-0 w-full z-10 grid justify-items-center ease-in duration-300"
    >
      {/* Desktop View */}
      <div className="hidden lg:flex max-w-[1240px] justify-between items-center p-4 text-white">
        <Link href="/login">
          {" "}
          <h1 className="text-2xl pt-3 transtion mr-44 font-light duration-500 hover:scale-125 flex justify-center">
            emotion
            <span className="font-bold">AL</span>
            <span className="text-xs mt-3 ml-2"> Dashboard</span>{" "}
          </h1>{" "}
        </Link>

        <ul className="hidden sm:flex justify-items-center">
          <li className="pt-4 px-2">
            <Link
              href="/"
              className="pl-2 pr-2 text-sm transition font-light duration-500 hover:scale-125 from-gray-400 to-violet-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
            >
              {" "}
              Übersicht{" "}
            </Link>
          </li>
          <li className="pt-4 px-2">
            <Link
              href="/patients"
              className="pl-2 pr-2 text-sm transition font-light duration-500 hover:scale-125 from-gray-400 to-violet-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
            >
              {" "}
              Patienten{" "}
            </Link>
          </li>
          <li className="pt-4 px-2">
            <Link
              href="/settings"
              className="pl-2 pr-2 text-sm transition font-light duration-500 hover:scale-125 from-gray-400 to-violet-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
            >
              {" "}
              Einstellungen{" "}
            </Link>
          </li>
          <li className="pt-4 px-2">
            <Link
              href="/login"
              className="pl-2 pr-2 text-sm transition font-light duration-500 hover:scale-125 from-gray-400 to-violet-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
            >
              {" "}
              Log Out{" "}
            </Link>
          </li>
        </ul>
      </div>

      <div className="fixed left-0 top-0 w-full z-10 ease-in duration-300">
        {/* Mobile View */}
        <div
          style={{ backgroundColor: "#060620" }}
          className="fixed left-0 top-0 h-16 lg:hidden w-full z-10 ease-in duration-300"
        >
          <Link href="/login">
            {" "}
            <h1 className=" max-sm:text-lg text-2xl font-light pl-4 pt-4">
              {" "}
              emotion<span className="font-bold">AL</span> Dashboard{" "}
            </h1>{" "}
          </Link>
          <div
            onClick={handleNav}
            className="absolute right-4 top-4 block lg:hidden z-10"
          >
            {nav ? (
              <AiOutlineClose className="text-white" size={30} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </div>
          <div
            className={
              nav
                ? "bg-black/80 lg:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-gray text-center ease-in duration-300"
                : "lg:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-gray text-center ease-in duration-300"
            }
          >
            <ul className="text-white">
              <li
                onClick={handleNav}
                className="text-2xl my-10 transition font-light from-gray-400 to-violet-900 bg-gradient-to-bl justify-center rounded-full"
              >
                <Link href="/"> Übersicht </Link>
              </li>
              <li
                onClick={handleNav}
                className="text-2xl my-10 w-48 transition font-light from-gray-400 to-violet-900 bg-gradient-to-bl justify-center rounded-full"
              >
                <Link href="/patients"> Patienten </Link>
              </li>
              <li
                onClick={handleNav}
                className="text-2xl my-10 transition font-light from-gray-400 to-violet-900 bg-gradient-to-bl justify-center rounded-full"
              >
                <Link href="/settings"> Einstellungen </Link>
              </li>
              <li
                onClick={handleNav}
                className="text-2xl my-10 transition font-light from-gray-400 to-violet-900 bg-gradient-to-bl justify-center rounded-full"
              >
                <Link href="/login"> Log Out </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default navbar;
