import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios"; // axios is a library that allows us to make HTTP requests
import Popup from "../patiet-add-popup/popup";
import "reactjs-popup/dist/index.css";

const Patientlist = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState([]);

  const router = useRouter();
  const currentRoute = router.pathname;

  // useEffect is a React hook that allows us to run code when the component is mounted
  // axios is used to make HTTP requests
  useEffect(() => {
    try {
      axios.get("/api/patient-data").then((res) => {
        setPatients(res.data);
      });
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    axios.get("/api/getUser").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div className=" md:flex-row  flex-1">
      <div
        style={{ background: "#ffffff" }}
        className="m-4 h-screen scrollbar-hide overflow-y-scroll rounded-2xl w-full md:w-72"
      >
        <div
          className="pt-4 px-2 pl-2 pr-2 text-xs grid justify-items-center
         transition font-light duration-500 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-full"
        >
          Eingeloggt als:
        </div>
        <div
          className="px-2 pl-2 pr-2 grid justify-items-center
         text-xs transition font-bold duration-500 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-full"
        >
          {user[0] + " " + user[2] + " " + user[1]}
        </div>

        <div
          className="grid justify-items-center
        "
        >
          <div className="my-3 text-xl">Patientenübersicht</div>
          <div className="mx-4">
            <Popup />
          </div>
          <input
            className="bg-black/10 mb-2 py-2 w-4/5 rounded-lg text-center
            "
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
                  {typeof patients === undefined ? (
                    <div>loading...</div>
                  ) : (
                    patients
                      .filter((patient: any) => patient.therapistID === user[3])
                      .map((patient: any) => (
                        <Link key={patient.ID} href={"/patients/" + patient.ID}>
                          <div
                            className="text-center
                           custom-blue m-1 rounded-lg text-white"
                          >
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
                        <Link key={patient.ID} href={"/patients/" + patient.ID}>
                          <div
                            className="text-center
                           bg-white m-1 rounded-lg"
                          >
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

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function genderHelper(a: String) {
  if (a === "m") {
    return "Männlich";
  } else if (a === "w") {
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

function getDateHelper(a: number) {
  if (a < 10) {
    return "0" + a;
  } else {
    return a;
  }
}

function refreshPage() {
  window.location.reload();
}
