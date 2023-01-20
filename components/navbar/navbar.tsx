import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import AppLogo from "../../public/mimical_logo.svg";

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
    axios.post("/api/logout").then((res) => {
      refreshPage();
    });
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
        <div className="flex max-w-[1240px] justify-between items-center text-black">
          <div className="flex justify-around px-16 py-3">
            <Image src={AppLogo} alt="AppLogo" width={50} height={50} />
            <Link href="/login">
              {" "}
              <h1 className="text-4xl pt-3 transtion mx-5 font-normal duration-500 flex justify-center">
                mimical
                <span className="text-sm mt-8 font-light"> Dashboard</span>{" "}
              </h1>{" "}
            </Link>
          </div>

          <ul className="flex  absolute right-0 mr-16 ">
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
