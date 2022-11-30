import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

import ProfilePic from "../../public/ProfilePic.png";
import Image from "next/image";

const index = () => {
  const [patients, setPatients] = useState([]);
  const router = useRouter();
  var index = router.query.index;

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
          {/*
           */}
          {/*
           */}
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
        <div>
          <div className="m-5 bg-black/10 rounded-lg">
            <div className="m-4 flex">
              <Image
                className="my-2 rounded-lg"
                src={ProfilePic}
                alt={"ProfilePic"}
                width={150}
                height={150}
              />
              {typeof patients === "undefined" ? (
                <div>loading...</div>
              ) : (
                patients
                  .filter((patient: any) => patient.ID == index)
                  .map((patient: any) => (
                    <div className=" ml-5 my-5 grid grid-rows-6 grid-flow-col gap-y-0.5 gap-x-3">
                      <div className="text-sm">
                        Name: {patient.Prename} {patient.Name}
                      </div>
                      <div className="text-sm">Patienten ID: {patient.ID}</div>
                      <div className="text-sm">
                        Geschlecht: {genderChecker(patient.Gender)}
                      </div>
                      <div className="text-sm">
                        Geburtsdatum : {getBirthdate(patient.Birthdate)}
                      </div>
                      <div className="text-sm">
                        Diagnose: {diagnoseChecker(patient.Diagnose)}
                      </div>
                      <div className="text-sm">
                        Taubheitsgefühl?: {numbnessChecker(patient.Numbness)}
                      </div>
                      <div className="text-sm">Email: {patient.Email}</div>
                      <div className="text-sm"></div>
                      <div className="text-sm"></div>
                      <div className="text-sm">Alter: {patient.Age}</div>
                      <div className="text-sm">
                        Betroffene Seite:{" "}
                        {affectedSideChecker(patient.AffectedSide)}{" "}
                      </div>
                      <div className="text-sm"></div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
        <div className="ml-5 mt-5">
          To-Dos: Bilder in der Datenbank speichern, Notizen hinzufügen,
          Limitations hinzufügen
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default index;

function genderChecker(a: any) {
  if (a == "m") {
    return "Männlich";
  } else if (a == "f") {
    return "Weiblich";
  } else {
    return "Divers";
  }
}

function diagnoseChecker(a: any) {
  if (a == "c") {
    return "Zentrale Facialisparese";
  } else if (a == "p") {
    return "Periphere Facialisparese";
  }
}

function affectedSideChecker(a: any) {
  if (a == "r") {
    return "Rechts";
  } else if (a == "l") {
    return "Links";
  } else {
    return "Beide";
  }
}

function numbnessChecker(a: any) {
  if (a == "y") {
    return "Ja";
  } else if (a == "n") {
    return "Nein";
  }
}

function getBirthdate(a: any) {
  var date = new Date(a);
  var day = getDateHelper(date.getDate());
  var month = getDateHelper(date.getMonth() + 1);
  var year = date.getFullYear();
  return day + "." + month + "." + year;
}

function getDateHelper(a: any) {
  if (a < 10) {
    return "0" + a;
  } else {
    return a;
  }
}
