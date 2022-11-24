import { useState } from "react";
import React from "react";

// Here a new patient is created and its values are safe in constants

const index = () => {
  const [prename, setPrename] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [diagnose, setDiagnose] = useState("");
  const [affectedSide, setAffectedSide] = useState("");
  const [muscles, setMuscles] = useState("");
  const [numbness, setNumbness] = useState("");
  const [notes, setNotes] = useState("");

  {
    /* test */
  }
  function sendValues() {
    console.log(prename);
    console.log(name);
    console.log(email);
    console.log(gender);
    console.log(age);
    console.log(diagnose);
    console.log(affectedSide);
    console.log(muscles);
    console.log(numbness);
    console.log(notes);
  }

  return (
    <div className="text-black font-light">
      <h1 className="grid justify-items-center text-4xl mb-5 mt-5">
        Neuen Patienten anlegen
      </h1>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Voller Name"
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="patient-id"
              placeholder="Patienten ID"
            />

            <select
              className="form-select form-select-sm text-gray-400 appearance-none block w-full p-3 rounded mb-4 font-light bg-white bg-clip-padding bg-no-repeat border-solid border border-grey-light transition ease-in-out"
              aria-label=".form-select-sm example"
              placeholder="Geschlecht"
            >
              <option value="undefined">Bitte Geschlecht wählen...</option>
              <option value="male">Mann</option>
              <option value="female">Frau</option>
              <option value="diverse">Divers</option>
            </select>

            <label className="text-gray-400">Geburtsdatum</label>
            <input
              type="date"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="birthdate"
            />

            <input
              type="age"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="age"
              placeholder="Alter"
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
            />

            <form className="w-full">
              <label className="text-gray-400">
                Interessen
                <textarea
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  rows={3}
                ></textarea>
              </label>
            </form>

            <select
              className="form-select form-select-sm text-gray-400 appearance-none block w-full p-3 rounded mb-4 font-light bg-white bg-clip-padding bg-no-repeat border-solid border border-grey-light transition ease-in-out"
              aria-label=".form-select-sm example"
              placeholder="Sprachtherapeutische Diagnose"
            >
              <option value="undefined">
                Sprachtherapeutische Diagnose...
              </option>
              <option value="central">Zentrale Fazialisparese</option>
              <option value="peripheral">Periphere Fazialisparese</option>
            </select>

            <select
              className="form-select form-select-sm text-gray-400 appearance-none block w-full mb-4 p-3 rounded font-light bg-white bg-clip-padding bg-no-repeat border-solid border border-grey-light transition ease-in-out"
              aria-label=".form-select-sm example"
              placeholder="Betroffene Seite"
            >
              <option value="undefined">Betroffene Seite...</option>
              <option value="left">Linke Seite</option>
              <option value="right">Rechte Seite</option>
              <option value="both">Beide Seiten</option>
            </select>

            <form className="w-full">
              <label className=" text-gray-400">
                Bewegungsausmaß eingeschränkt bzw. reduziert bei folgender
                Muskulatur:
                <textarea
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  rows={3}
                ></textarea>
              </label>
            </form>

            <select
              className="form-select form-select-sm text-gray-400 appearance-none block w-full p-3 rounded mb-4 font-light bg-white bg-clip-padding bg-no-repeat border-solid border border-grey-light transition ease-in-out"
              aria-label=".form-select-sm example"
              placeholder="Taubheitsgefühl"
            >
              <option value="undefined">Taubheitsgefühl?...</option>
              <option value="yes">ja</option>
              <option value="no">nein</option>
            </select>

            <button
              type="submit"
              className="mt-4 mb-3 w-full bg-white hover:bg-gray-200 text-black border-solid border-2 border-black py-2 rounded-md transition duration-100"
            >
              Patienten anlegen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
