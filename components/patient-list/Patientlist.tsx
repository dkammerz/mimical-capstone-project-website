import Link from "next/link";
import React, { useEffect, useState } from "react";
import Axios from "axios"; // Axios is a library that allows us to make HTTP requests

const Patientlist = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect is a React hook that allows us to run code when the component is mounted
  // Axios is used to make HTTP requests
  useEffect(() => {
    try {
      Axios.get("/api/patient-data").then((res) => {
        setPatients(res.data);
      });
    } catch (error: any) {
      console.log("Es konnten keine Patienten geladen werden");
    }
  }, []);

  return (
    <div className=" md:flex-row flex-1">
      <div
        style={{ background: "#ffffff" }}
        className="m-4 h-screen scrollbar-hide overflow-y-scroll rounded-2xl w-full md:w-72"
      >
        <div className="grid justify-items-center">
          <div className="my-3 text-xl">Patientenübersicht</div>
          <div className="mx-4">
            <Link href="/patients/new-patient">
              <button className="w-full px-4 mb-4 bg-white hover:bg-gray-200 border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs">
                Neuen Patienten Hinzufügen
              </button>
            </Link>
          </div>
          <input
            className="bg-black/10 mb-2 py-2 w-4/5 rounded-lg  text-center"
            type="text"
            placeholder="Suchen (Name oder ID)"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          ></input>
          <div className="bg-black/10 mb-5 w-4/5 rounded-xl">
            {isSearch(searchTerm) ? (
              <div className="m-2 text-xs">
                <div className="grid justify-items-left text-lg">
                  {typeof patients === "undefined" ? (
                    <div>loading...</div>
                  ) : (
                    patients.map((patient: any) => (
                      <Link href={"/patients/" + patient.ID}>
                        <div className="text-center bg-white m-1 rounded-lg">
                          {patient.Prename + " " + patient.Name}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="m-2 text-xs">
                <div className="grid justify-items-left text-lg">
                  {typeof patients === "undefined" ? (
                    <div>loading...</div>
                  ) : (
                    patients
                      .filter(
                        (patient: any) =>
                          patient.Name.includes(searchTerm) ||
                          patient.Prename.includes(searchTerm) ||
                          (patient.Prename + " " + patient.Name).includes(
                            searchTerm
                          ) ||
                          (patient.Name + " " + patient.Prename).includes(
                            searchTerm
                          ) ||
                          patient.ID === parseInt(searchTerm)
                      )
                      .map((patient: any) => (
                        <Link href={"/patients/" + patient.ID}>
                          <div className="text-center bg-white m-1 rounded-lg">
                            {patient.Prename + " " + patient.Name}
                          </div>
                        </Link>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patientlist;

function isSearch(a: any) {
  if (a === "") {
    return true;
  } else {
    return false;
  }
}
