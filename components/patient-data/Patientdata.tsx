import Axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import ProPic from "../../public/istockphoto-1223671392-612x612.jpg";

const index = () => {
  var router = useRouter();
  var index = router.query.index;
  var [open, setOpen] = useState(false);

  var [patients, setPatients] = useState([]);
  var [error, setError] = useState(false);
  var [diagnose, setDiagnose] = useState("");
  var [diagnoseChanged, setDiagnoseChanged] = useState(false);
  var [diagnoseSend, setDiagnoseSend] = useState("");
  var [interests, setInterests] = useState("");
  var [interestsChanged, setInterestsChanged] = useState(false);
  var [interestsSend, setInterestsSend] = useState("");
  var [affectedSide, setAffectedSide] = useState("");
  var [affectedSideChanged, setAffectedSideChanged] = useState(false);
  var [affectedSideSend, setAffectedSideSend] = useState("");
  var [numbness, setNumbness] = useState("");
  var [numbnessChanged, setNumbnessChanged] = useState(false);
  var [numbnessSend, setNumbnessSend] = useState("");
  var [motion, setMotion] = useState("");
  var [motionChanged, setMotionChanged] = useState(false);
  var [motionSend, setMotionSend] = useState("");

  useEffect(() => {
    try {
      Axios.get("/api/patient-data").then((res) => {
        setPatients(res.data);
      });
    } catch (error: any) {
      console.log("Es konnten keine Patienten geladen werden");
    }
  }, []);

  const data = () => {
    if (diagnoseChanged) {
      diagnoseSend = diagnose;
    } else {
      diagnoseSend = patients
        .filter((patient: any) => patient.ID == index)
        .map((patient: any) => patient.diagnose)
        .toString();
    }

    if (interestsChanged) {
      interestsSend = interests;
    } else {
      interestsSend = patients
        .filter((patient: any) => patient.ID == index)
        .map((patient: any) => patient.interests)
        .toString();
    }

    if (affectedSideChanged) {
      affectedSideSend = affectedSide;
    } else {
      affectedSideSend = patients
        .filter((patient: any) => patient.ID == index)
        .map((patient: any) => patient.affectedSide)
        .toString();
    }

    if (numbnessChanged) {
      numbnessSend = numbness;
    } else {
      numbnessSend = patients
        .filter((patient: any) => patient.ID == index)
        .map((patient: any) => patient.numbness)
        .toString();
    }

    if (motionChanged) {
      motionSend = motion;
    } else {
      motionSend = patients
        .filter((patient: any) => patient.ID == index)
        .map((patient: any) => patient.limitations)
        .toString();
    }
  };

  const changeData = async () => {
    data();

    try {
      await Axios.post("/api/change-patient-data", {
        diagnoseSend: diagnoseSend,
        interestsSend: interestsSend,
        affectedSideSend: affectedSideSend,
        numbnessSend: numbnessSend,
        motionSend: motionSend,
        ID: index,
      }).then((res) => {
        refreshPage();
      });
    } catch (error: any) {}
  };

  return (
    <div className="m-5 rounded-lg flex justify-between">
      <div>
        <div className="m-4 flex">
          <Image
            className="my-2 rounded-lg"
            src={ProPic}
            alt={"ProPic"}
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
                  className="m-5 grid grid-rows-6 grid-flow-col gap-y-0.5 gap-x-3"
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
                  <div className="text-sm">Diagnose: {patient.diagnose}</div>

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
      <div>
        <div className="mt-4 scss-syntax">
          <button
            onClick={() => setOpen(true)}
            className="hover:underline font-light custom-blue-text text-sm"
          >
            Bearbeiten
          </button>

          <Popup
            open={open}
            closeOnDocumentClick
            modal
            onClose={() => setOpen(false)}
          >
            <div
              className="scss-syntax items-center
               text-center
               my-5"
            >
              Patientendaten:
            </div>
            <div
              className="grid grid-cols-3 justify-items-center items-center
              "
            >
              <div className="flex flex-col">
                <input hidden />
                <label className="scss-syntax pl-2">Vorname:</label>
                <input
                  className="scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  disabled={true}
                  placeholder={patients
                    .filter((patient: any) => patient.ID == index)
                    .map((patient: any) => patient.prename)
                    .toString()}
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="scss-syntax pl-2">Nachname:</label>
                <input
                  className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  disabled={true}
                  placeholder={patients
                    .filter((patient: any) => patient.ID == index)
                    .map((patient: any) => patient.name)
                    .toString()}
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="scss-syntax pl-2">ID:</label>
                <input
                  className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  disabled={true}
                  placeholder={patients
                    .filter((patient: any) => patient.ID == index)
                    .map((patient: any) => patient.ID)
                    .toString()}
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="scss-syntax pl-2">Email:</label>
                <input
                  className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  disabled={true}
                  placeholder={patients
                    .filter((patient: any) => patient.ID == index)
                    .map((patient: any) => patient.email)
                    .toString()}
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="scss-syntax pl-2">Geburtsdatum:</label>
                <input
                  className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  disabled={true}
                  placeholder={getBirthdayAny(
                    patients
                      .filter((patient: any) => patient.ID == index)
                      .map((patient: any) => patient.birthdate)
                      .toString()
                  )}
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="scss-syntax pl-2">Geschlecht:</label>
                <input
                  className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  disabled={true}
                  placeholder={genderHelper(
                    patients
                      .filter((patient: any) => patient.ID == index)
                      .map((patient: any) => patient.gender)
                      .toString()
                  )}
                ></input>
              </div>
            </div>
            <div
              className="scss-syntax text-center
               my-5"
            >
              Folgende Daten können verändert werden:
            </div>

            {/* Editable by Therapist */}
            <div
              className="grid grid-cols-3 justify-items-center items-center
              "
            >
              <div className="flex flex-col">
                <label className="scss-syntax pl-2">Diagnose:</label>
                <input
                  className="bg-black/10 scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  onClick={() => {
                    if (diagnose === "") {
                      setDiagnoseChanged(true);
                      setDiagnose(
                        patients
                          .filter((patient: any) => patient.ID == index)
                          .map((patient: any) => patient.diagnose)
                          .toString()
                      );
                    }
                  }}
                  placeholder={patients
                    .filter((patient: any) => patient.ID == index)
                    .map((patient: any) => patient.diagnose)
                    .toString()}
                  onChange={(e) => {
                    setDiagnose(e.target.value);
                  }}
                  value={diagnose}
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="scss-syntax pl-2">Betroffene Seite:</label>
                <input
                  className="bg-black/10 scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  onClick={() => {
                    if (affectedSide === "") {
                      setAffectedSideChanged(true);
                      setAffectedSide(
                        patients
                          .filter((patient: any) => patient.ID == index)
                          .map((patient: any) => patient.affectedSide)
                          .toString()
                      );
                    }
                  }}
                  placeholder={patients
                    .filter((patient: any) => patient.ID == index)
                    .map((patient: any) => patient.affectedSide)
                    .toString()}
                  onChange={(e) => {
                    setAffectedSide(e.target.value);
                  }}
                  value={affectedSide}
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="scss-syntax pl-2">Taubheitsgefühl:</label>
                <input
                  className="bg-black/10 scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
                  type="text"
                  onClick={() => {
                    if (numbness === "") {
                      setNumbnessChanged(true);
                      setNumbness(
                        patients
                          .filter((patient: any) => patient.ID == index)
                          .map((patient: any) => patient.numbness)
                          .toString()
                      );
                    }
                  }}
                  placeholder={patients
                    .filter((patient: any) => patient.ID == index)
                    .map((patient: any) => patient.numbness)
                    .toString()}
                  onChange={(e) => {
                    setNumbness(e.target.value);
                  }}
                  value={numbness}
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="scss-syntax pl-2">Interessen:</label>
              <textarea
                className="bg-black/10 scss-syntax font-extralight mb-2 py-2 w-full h-32 rounded-lg
                    "
                onClick={() => {
                  if (interests === "") {
                    setInterestsChanged(true);
                    setInterests(
                      patients
                        .filter((patient: any) => patient.ID == index)
                        .map((patient: any) => patient.interests)
                        .toString()
                    );
                  }
                }}
                autoFocus={false}
                placeholder={patients
                  .filter((patient: any) => patient.ID == index)
                  .map((patient: any) => patient.interests)
                  .toString()}
                onChange={(e) => {
                  setInterests(e.target.value);
                }}
                value={interests}
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label className="scss-syntax pl-2">
                Bewegungsausmaß eingeschränkt bzw. reduziert bei folgender
                Muskulatur:
              </label>
              <textarea
                className="bg-black/10 scss-syntax font-extralight mb-2 py-2 w-full h-32 rounded-lg
                    "
                onClick={() => {
                  if (motion === "") {
                    setMotionChanged(true);
                    setMotion(
                      patients
                        .filter((patient: any) => patient.ID == index)
                        .map((patient: any) => patient.limitations)
                        .toString()
                    );
                  }
                }}
                placeholder={patients
                  .filter((patient: any) => patient.ID == index)
                  .map((patient: any) => patient.limitations)
                  .toString()}
                onChange={(e) => {
                  setMotion(e.target.value);
                }}
                value={motion}
              ></textarea>
            </div>
            <div
              className="grid justify-items-center
              "
            >
              <button
                onClick={changeData}
                className="w-3/5 my-4  scss-syntax bg-white hover:bg-gray-200 border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs"
              >
                Ändern
              </button>
            </div>

            <div
              className={`${
                !error ? "hidden" : ""
              } font-light text-xs text-red-500 text-center
                `}
            >
              Es gibt keinen Patienten mit diesem Schlüssel, bitte versuchen Sie
              es erneut.
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default index;

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

function getBirthdayAny(a: any) {
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

function genderHelper(a: String) {
  if (a === "m") {
    return "Männlich";
  } else if (a === "w") {
    return "Weiblich";
  } else {
    return "Divers";
  }
}

function refreshPage() {
  window.location.reload();
}
