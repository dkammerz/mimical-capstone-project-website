import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import PatientList from "../../components/patient-list/Patientlist";
import PatientData from "../../components/patient-data/Patientdata";

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
        <PatientData />
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
        <div className="bg-black/10 rounded-lg m-5">
          <div className="mx-5 font-bold">
            ChartJS wird bald vervollständigt
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default index;

// Functions
function getDateHelper(a: number) {
  if (a < 10) {
    return "0" + a;
  } else {
    return a;
  }
}
