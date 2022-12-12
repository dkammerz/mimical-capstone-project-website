import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

// Usual navbar as learned in previous lessons
// For CSS usualy I use TailwindCSS
// The navbar is split into desktop and mobile view

const navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const router = useRouter();
  const currentRoute = router.pathname;
  const currentlogin = router.pathname;

  const logout = () => {
    axios.post("/api/logout");
    refreshPage();
    router.push("/login");
  };

  function refreshPage() {
    window.location.reload();
  }

  if (currentlogin !== "/login") {
    return (
      <div
        style={{ backgroundColor: "#FFFFFF" }}
        className="w-full z-10 grid shadow-md justify-items-start ease-in duration-300"
      >
        <div className="flex max-w-[1240px] justify-between items-center mb-2 text-black">
          <Link href="/login">
            {" "}
            <h1 className="text-4xl pt-3 transtion ml-16 font-light duration-500 flex justify-center">
              mimical
              <span className="text-sm mt-8"> Dashboard</span>{" "}
            </h1>{" "}
          </Link>

          <ul className="flex  absolute right-0 mr-16 ">
            <li className="pt-4 px-2">
              <Link
                href="/"
                className={
                  currentRoute === "/"
                    ? "pl-2 pr-2 text-sm transition font-light duration-500 scale-125 underline focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
                    : "pl-2 pr-2 text-sm transition font-light duration-500 hover:scale-125 hover:underline focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
                }
              >
                {" "}
                Übersicht{" "}
              </Link>
            </li>
            <li className="pt-4 px-2">
              <Link
                href="/settings"
                className={
                  currentRoute === "/settings"
                    ? "pl-2 pr-2 text-sm transition font-light duration-500 scale-125 underline focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
                    : "pl-2 pr-2 text-sm transition font-light duration-500 hover:scale-125 hover:underline focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
                }
              >
                {" "}
                Einstellungen{" "}
              </Link>
            </li>
            <li className="pt-4 px-2">
              <Link
                href="/login"
                onClick={logout}
                className={
                  currentRoute === "/logout"
                    ? "pl-2 pr-2 text-sm transition font-light duration-500 scale-125 underline focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
                    : "pl-2 pr-2 text-sm transition font-light duration-500 hover:scale-125 hover:underline focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full"
                }
              >
                {" "}
                Log Out{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default navbar;
