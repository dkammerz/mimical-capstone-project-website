import Link from "next/link";
import { type } from "os";
import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const index = () => {
  const [patients, setPatients] = useState([]);
  const router = useRouter();
  const index = router.query.index;

  // useEffect(() => {
  //   fetch("/api/patient-data")
  //     .then((req) => req.json())
  //     .then((data) => {
  //       setPatients(data);
  //     });
  // }, []);

  useEffect(() => {
    try {
      Axios.get("/api/patient-data").then((res) => {
        setPatients(res.data);
      });
    } catch (error) {
      console.log("error");
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row flex-1 font-light scss-syntax">
      {/* Patient Select */}
      <div className=" md:flex-row flex-1">
        <div
          style={{ background: "#ffffff" }}
          className="m-4 rounded-2xl w-full md:w-96"
        >
          <div className="grid justify-items-center">
            <div className="my-3 text-xl">Alle Patienten</div>
            <div className="bg-black/10 h-screen mb-5 w-4/5 rounded-xl scrollbar-hide overflow-y-scroll">
              <div className="m-2 text-xs">
                <div className="grid  justify-items-left text-lg">
                  {typeof patients === "undefined" ? (
                    <div>loading...</div>
                  ) : (
                    patients.map((patient: any) => (
                      <Link href={"/patients/" + patient.ID}>
                        <div className="text-center m-1 bg-white border-black border-solid border-2 rounded-lg">
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
              <button className="w-full px-4 mb-4 bg-white hover:bg-gray-200 border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs">
                Neuen Patienten Hinzufügen
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Patient Screen */}

      <div style={{ background: "#ffffff" }} className="m-4 rounded-2xl w-full">
        <div className="m-4">
          {typeof patients === "undefined" ? (
            <div>loading...</div>
          ) : (
            patients
              .filter((patient: any) => patient.ID == index)
              .map((patient: any) => <div>{patient.Name}</div>)
          )}
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default index;
