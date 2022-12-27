import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

import ProfilePic from "../../public/ProfilePic.png";
import Image from "next/image";
import PatientList from "../../components/patient-list/Patientlist";

// Dynamic Patient Page

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
      <PatientList />
      {/* Patient Screen */}

      <div
        style={{ background: "#ffffff" }}
        className="m-4 h-screen rounded-2xl justify-start w-full shadow-lg scrollbar-hide overflow-y-scroll"
      >
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
                    <div
                      key={patient.ID}
                      className=" ml-5 m-5 grid grid-rows-6 grid-flow-col gap-y-0.5 gap-x-3"
                    >
                      <div className="text-sm">
                        Name: {patient.prename} {patient.name}
                      </div>
                      <div className="text-sm">Patienten ID: {patient.ID}</div>
                      <div className="text-sm">
                        Geschlecht: {genderChecker(patient.gender)}
                      </div>
                      <div className="text-sm">
                        Geburtsdatum : {getBirthdate(patient.birthdate)}
                      </div>
                      <div className="text-sm">
                        Taubheitsgefühl?: {patient.numbness}
                      </div>
                      <div className="text-sm">
                        Diagnose: {patient.diagnose}
                      </div>

                      <div className="text-sm">Email: {patient.email}</div>
                      <div className="text-sm"></div>
                      <div className="text-sm"></div>
                      <div className="text-sm">
                        Alter: {getAge(patient.birthdate)}
                      </div>
                      <div className="text-sm">
                        Betroffene Seite: {patient.affectedSide}
                      </div>
                      <div className="text-sm"></div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
        <div className="m-5 bg-black/10 rounded-lg">
          <div className="m-5 font-bold">
            Bewegungsausmaß eingeschränkt bzw. reduziert bei folgender
            Muskulatur:
            <div className="font-light">
              {typeof patients === "undefined" ? (
                <div>loading...</div>
              ) : (
                patients
                  .filter((patient: any) => patient.ID == index)
                  .map((patient: any) => (
                    <div key={patient.ID} className="text-sm">
                      {patient.limitations}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
        <div className="bg-black/10 rounded-lg m-5">
          <div className=" mx-5">.</div>
        </div>
        <div className="m-5 test bg-black/10 rounded-lg">
          <div className="m-5 font-bold">
            Notizen:
            <div id={"mydiv"} className="font-light">
              {typeof patients === "undefined" ? (
                <div>loading...</div>
              ) : (
                patients
                  .filter((patient: any) => patient.ID == index)
                  .map((patient: any) => (
                    <div key={patient.ID} className="text-sm">
                      {patient.interests}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default index;

// Functions

function genderChecker(a: String) {
  if (a == "m") {
    return "Männlich";
  } else if (a == "f") {
    return "Weiblich";
  } else {
    return "Divers";
  }
}

function getBirthdate(a: Date) {
  var date = new Date(a);
  var day = getDateHelper(date.getDate());
  var month = getDateHelper(date.getMonth() + 1);
  var year = date.getFullYear();
  return day + "." + month + "." + year;
}

function getAge(dateString: Date) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getDateHelper(a: number) {
  if (a < 10) {
    return "0" + a;
  } else {
    return a;
  }
}
