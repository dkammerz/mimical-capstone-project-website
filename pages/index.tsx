import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="flex flex-col md:flex-row flex-1 text-black font-light">
      {/* Patient Select */}
      <div
        style={{ background: "#ffffff" }}
        className="m-4 rounded-2xl w-full md:w-96 text-black"
      >
        <div className="grid justify-items-center">
          <div className="my-5">Alle Patienten</div>
          <div className="bg-black/30 w-4/5 rounded-xl">
            <div className="m-2 text-xs">Daniel Kammerzell</div>
          </div>
        </div>
        <div className="absolute bottom-8 left-[3.4rem]">
          <Link href="/patients/new-patient">
            <button className="w-full px-4 bg-white hover:bg-gray-200 text-black border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs">
              Neuen Patienten Hinzufügen
            </button>
          </Link>
        </div>
      </div>

      {/* Patient Screen */}

      <div
        style={{ background: "#ffffff" }}
        className="m-4 rounded-2xl w-full"
      ></div>

      {/*  */}
    </div>
  );
};

export default index;
