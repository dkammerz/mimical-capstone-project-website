import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

// Usual navbar as learned in previous lessons
// For CSS usualy I use TailwindCSS
// The navbar is split into desktop and mobile view

const navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState([]);

  const handleNav = () => {
    setNav(!nav);
  };

  const router = useRouter();
  const currentRoute = router.pathname;

  const logout = () => {
    axios.post("/api/logout");
    refreshPage();
    router.push("/login");
  };

  useEffect(() => {
    axios.get("/api/authenticate").then((res) => {
      if (res.data === true) {
        axios.get("/api/getUser").then((res) => {
          setUser(res.data);
        });
      }
    });
  }, []);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div
      style={{ backgroundColor: "#FFFFFF" }}
      className="fixedleft-0 top-0 w-full z-10 grid justify-items-center ease-in duration-300"
    >
      {/* Desktop View */}
      <div className="flex max-w-[1240px] justify-between items-center mb-2 text-black">
        <Link href="/login">
          {" "}
          <h1 className="text-4xl pt-3 transtion mr-44 font-light duration-500 flex justify-center">
            mimical
            <span className="text-sm mt-8"> Dashboard</span>{" "}
          </h1>{" "}
        </Link>

        <ul className="hidden sm:flex justify-items-center">
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
        <div className="pt-4 px-2 pl-2 pr-2 text-sm transition font-light duration-500 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 flex justify-center rounded-full">
          Eingeloggt als: <span className="text-white">_</span>{" "}
          <span className="font-bold">
            {user[0] + " " + user[2] + " " + user[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default navbar;
