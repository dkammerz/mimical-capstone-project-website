import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios is a library that allows us to make HTTP requests
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Patientlist = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientkey, setPatientkey] = useState("");
  const [user, setUser] = useState([]);
  const [user2, setUser2] = useState([]);

  // useEffect is a React hook that allows us to run code when the component is mounted
  // axios is used to make HTTP requests
  useEffect(() => {
    try {
      axios.get("/api/patient-data").then((res) => {
        setPatients(res.data);
      });
    } catch (error: any) {
      console.log("Es konnten keine Patienten geladen werden");
    }
  }, []);

  useEffect(() => {
    axios.get("/api/getUser").then((res) => {
      setUser(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/authenticate").then((res) => {
      if (res.data === true) {
        axios.get("/api/getUser").then((res) => {
          setUser2(res.data);
        });
      }
    });
  }, []);

  const sendPatientkey = async () => {
    await axios.post("/api/addPatientToDashboard", { patientkey: patientkey });
  };

  return (
    <div className=" md:flex-row  flex-1">
      <div
        style={{ background: "#ffffff" }}
        className="m-4 h-screen scrollbar-hide shadow-lg overflow-y-scroll rounded-2xl w-full md:w-72"
      >
        <div className="pt-4 px-2 pl-2 pr-2 text-xs grid justify-items-center transition font-light duration-500 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-full">
          Eingeloggt als:
        </div>
        <div className="px-2 pl-2 pr-2 grid justify-items-center text-xs transition font-bold duration-500 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-full">
          {user[0] + " " + user[2] + " " + user[1]}
        </div>

        <div className="grid justify-items-center">
          <div className="my-3 text-xl">Patientenübersicht</div>
          <div className="mx-4">
            <Popup
              trigger={
                <button className="w-full px-4 mb-4 bg-white hover:bg-gray-200 border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs">
                  Neuen Patienten Hinzufügen
                </button>
              }
              position="right center"
            >
              <div className="scss-syntax text-center mb-5">
                Bitte geben Sie den Patietenschlüssel ein um einen neuen
                Patienten zu regestrieren.
              </div>
              <input
                className="bg-black/10 text-black font-extralight mb-2 py-2 rounded-lg w-full text-center"
                type="text"
                placeholder="Patientenschlüssel"
                onChange={(e) => {
                  setPatientkey(e.target.value);
                }}
                value={patientkey}
              ></input>
              <button
                onClick={sendPatientkey}
                className="w-full mb-4 scss-syntax bg-white hover:bg-gray-200 border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs"
              >
                Hinzufügen
              </button>
            </Popup>
          </div>
          <input
            className="bg-black/10 mb-2 py-2 w-4/5 rounded-lg text-center"
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
                    patients
                      .filter((patient: any) => patient.therapistID === user[3])
                      .map((patient: any) => (
                        <Link href={"/patients/" + patient.ID}>
                          <div className="text-center bg-white m-1 rounded-lg">
                            {patient.prename + " " + patient.name}
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
                          (patient.name.includes(searchTerm) &&
                            patient.therapistID === user[3]) ||
                          (patient.prename.includes(searchTerm) &&
                            patient.therapistID === user[3]) ||
                          ((patient.prename + " " + patient.name).includes(
                            searchTerm
                          ) &&
                            patient.therapistID === user[3]) ||
                          ((patient.name + " " + patient.prename).includes(
                            searchTerm
                          ) &&
                            patient.therapistID === user[3]) ||
                          (patient.ID === parseInt(searchTerm) &&
                            patient.therapistID === user[3])
                      )
                      .map((patient: any) => (
                        <Link href={"/patients/" + patient.ID}>
                          <div className="text-center bg-white m-1 rounded-lg">
                            {patient.prename + " " + patient.name}
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
