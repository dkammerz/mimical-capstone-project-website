import Link from "next/link";
import { type } from "os";
import React from "react";
import { useState, useEffect } from "react";

const index = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/api/patient-data")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row flex-1 text-black font-light">
      {/* Patient Select */}
      <div className=" md:flex-row flex-1 text-black font-light">
        <div
          style={{ background: "#ffffff" }}
          className="m-4 rounded-2xl w-full md:w-96 text-black"
        >
          <div className="grid justify-items-center">
            <div className="my-5">Alle Patienten</div>
            <div className="bg-black/10 h-screen mb-5 w-4/5 rounded-xl">
              <div className="m-2 text-xs">
                <div className="grid justify-items-left text-lg">
                  {typeof patients === "undefined" ? (
                    <div>loading...</div>
                  ) : (
                    patients.map((patient: any) => (
                      <Link href="/patients">
                        <div className="text-center m-1 border-black border-solid border-2 rounded-lg">
                          {patient.Prename + " " + patient.Name}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4">
            <Link href="/patients/new-patient">
              <button className="w-full px-4 mb-4 bg-white hover:bg-gray-200 text-black border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs">
                Neuen Patienten Hinzufügen
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Patient Screen */}

      <div style={{ background: "#ffffff" }} className="m-4 rounded-2xl w-full">
        <div className="m-4">
          <button>Test</button>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default index;
