import Link from "next/link";
import React from "react";

const patients = () => {
  function handleClick() {
    //     console.log("Test")
    //     setDoc(UserDatabase, docData)
  }

  // const UserDatabase = doc(firestore, 'User')

  // const docData = {
  //     role: 'user'
  // }

  return (
    <div>
      <h1 className="text-4xl justify-center hidden lg:block font-extralight pb-4 ml-7 text-left">
        Alle Patienten
      </h1>
      <h1 className="text-4xl justify-center text-left block font-extralight ml-7 pt-4 pb-4 lg:hidden">
        Alle Patienten
      </h1>

      <div className="justify-center">
        <div className="mb-3">
          <div className="input-group flex ml-5 mr-5 mb-4">
            <input
              type="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Patient suchen (Name oder ID)"
              aria-label="Patient suchen"
              aria-describedby="button-addon2"
            />
            <button
              className="btn pl-4 ml-2 pr-4 bg-white hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'"
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-10 ml-5">
        <Link href="/patients/new-patient">
          <button
            onClick={handleClick}
            className="w-64 max-sm:w-32 text-sm transition font-light duration-500 hover:scale-110 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 justify-center rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="mr-2 w-6 h-6 flex"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
            <span className="max-sm:hidden">Neuen Patienten hinzufügen</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default patients;
