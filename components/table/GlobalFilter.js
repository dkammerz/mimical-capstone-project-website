import React, { useState } from 'react';
import 'regenerator-runtime/runtime';
import { useAsyncDebounce } from 'react-table';
import Link from 'next/link';

// This JavaScript snippet is used to search in a table

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce(value1 => {
    setFilter(value1 || undefined);
  }, 1000);

  function handleClick() {
    console.log("Test");
    //     setDoc(UserDatabase, docData)
  }

  return (
    <div className="flex ml-2 w-full">
      <input
        className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        placeholder="Patient suchen (Name oder ID)"
        aria-label="Patient suchen"
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <Link href="/patients/new-patient">
        <button
          onClick={handleClick}
          className="w-56 max-sm:w-32 py-1 ml-3 text-sm transition font-light duration-500 hover:scale-110 bg-gradient-to-br from-gray-400 to-violet-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 justify-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-8 flex pr-2"
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
  );
};

export default GlobalFilter;
