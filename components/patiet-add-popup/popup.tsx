import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";

const popup = () => {
  const [patientkey, setPatientkey] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [addedPatientOpen, setAddedPatientOpen] = useState(false);
  const [addPatientData, setAddPatientData] = useState(Object);

  const [diagnose, setDiagnose] = useState("");
  const [interests, setInterests] = useState("");
  const [affectedSide, setAffectedSide] = useState("");
  const [numbness, setNumbness] = useState("");
  const [motion, setMotion] = useState("");

  // useEffect is a React hook that allows us to run code when the component is mounted
  // axios is used to make HTTP requests

  const sendPatientkey = async () => {
    await axios
      .post("/api/check-patient-key-from-dashboard", { key: patientkey })
      .then(async (res) => {
        if (res.data === "nothing") {
          setError(true);
          await sleep(5000);
          setError(false);
        } else {
          setAddPatientData(res.data);
          setAddedPatientOpen(true);
        }
      });
  };

  const addPatient = async () => {
    const data = {
      diagnoseSend: diagnose,
      interestsSend: interests,
      affectedSideSend: affectedSide,
      numbnessSend: numbness,
      motionSend: motion,
      ID: addPatientData.ID,
    };

    try {
      await axios.post("/api/add-patient", data).then((res) => {
        refreshPage();
      });
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="w-full px-4 mb-4 bg-white hover:bg-gray-200 border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs"
      >
        Neuen Patienten Hinzufügen
      </button>
      <Popup
        open={open}
        closeOnDocumentClick
        modal
        onClose={() => setOpen(false)}
      >
        <div
          className="scss-syntax text-center
               mb-5"
        >
          Bitte geben Sie den Patietenschlüssel ein um einen neuen Patienten zu
          regestrieren.
        </div>
        <div
          className="flex flex-col items-center
              "
        >
          <input
            className="bg-black/10 scss-syntax font-extralight mb-2 py-2 w-3/5 rounded-lg text-center
                  "
            type="text"
            placeholder="Patientenschlüssel"
            onChange={(e) => {
              setPatientkey(e.target.value);
            }}
            value={patientkey}
          ></input>
          <button
            onClick={sendPatientkey}
            className="w-3/5 mb-4 scss-syntax bg-white hover:bg-gray-200 border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs"
          >
            Hinzufügen
          </button>
        </div>
        <div
          className={`${
            !error ? "hidden" : ""
          } font-light text-xs text-red-500 text-center
                `}
        >
          Es gibt keinen Patienten mit diesem Schlüssel, bitte versuchen Sie es
          erneut.
        </div>
      </Popup>

      {/* If a new Patient can be added, a new PopUp opens with credentials to fill */}
      <Popup
        open={addedPatientOpen}
        closeOnDocumentClick
        modal
        onClose={() => setAddedPatientOpen(false)}
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
            <label className="scss-syntax pl-2">Vorname:</label>
            <input
              className="scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
              type="text"
              disabled={true}
              placeholder={addPatientData.prename}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="scss-syntax pl-2">Nachname:</label>
            <input
              className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
              type="text"
              disabled={true}
              placeholder={addPatientData.name}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="scss-syntax pl-2">ID:</label>
            <input
              className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
              type="text"
              disabled={true}
              placeholder={addPatientData.ID}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="scss-syntax pl-2">Email:</label>
            <input
              className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
              type="text"
              disabled={true}
              placeholder={addPatientData.email}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="scss-syntax pl-2">Geburtsdatum:</label>
            <input
              className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
              type="text"
              disabled={true}
              placeholder={getBirthdate(addPatientData.birthdate)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="scss-syntax pl-2">Geschlecht:</label>
            <input
              className=" scss-syntax font-extralight mb-2 py-2 w-full rounded-lg text-center
                    "
              type="text"
              disabled={true}
              placeholder={genderHelper(addPatientData.gender)}
            ></input>
          </div>
        </div>
        <div
          className="scss-syntax text-center
               my-5"
        >
          Ergänzen Sie bitte die folgenden Daten:
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
              placeholder="Periphere/Zentrale"
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
              placeholder="Links/Rechts/Beide"
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
              placeholder="Ja/Nein"
              onChange={(e) => {
                setNumbness(e.target.value);
              }}
              value={numbness}
            ></input>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="scss-syntax pl-2">Interessen:</label>
          <input
            className="bg-black/10 scss-syntax font-extralight mb-2 py-2 w-full h-32 rounded-lg
                    "
            type="text"
            onChange={(e) => {
              setInterests(e.target.value);
            }}
            value={interests}
          ></input>
        </div>
        <div className="flex flex-col">
          <label className="scss-syntax pl-2">
            Bewegungsausmaß eingeschränkt bzw. reduziert bei folgender
            Muskulatur:
          </label>
          <input
            className="bg-black/10 scss-syntax font-extralight mb-2 py-2 w-full h-32 rounded-lg
                    "
            type="text"
            onChange={(e) => {
              setMotion(e.target.value);
            }}
            value={motion}
          ></input>
        </div>
        <div
          className="grid justify-items-center
              "
        >
          <button
            onClick={addPatient}
            className="w-3/5 my-4  scss-syntax bg-white hover:bg-gray-200 border-black border-solid border-2 py-2 rounded-md transition duration-100 text-xs"
          >
            Hinzufügen
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default popup;

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
