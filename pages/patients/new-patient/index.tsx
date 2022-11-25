import { useState } from "react";
import React from "react";

// Here a new patient is created and its values are safe in constants

const index = () => {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState("");
  const [diagnose, setDiagnose] = useState("");
  const [affectedSide, setAffectedSide] = useState("");
  const [muscles, setMuscles] = useState("");
  const [numbness, setNumbness] = useState("");
  const [notes, setNotes] = useState("");

  {
    /* test */
  }
  function sendValues() {
    console.log(name);
    console.log(id);
    console.log(email);
    console.log(gender);
    console.log(birthdate);
    console.log(age);
    console.log(interests);
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
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              type="integer"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="patient-id"
              placeholder="Patienten ID"
              onChange={(e) => setID(e.target.value)}
              value={id}
            />

            <select
              className="form-select form-select-sm text-gray-400 appearance-none block w-full p-3 rounded mb-4 font-light bg-white bg-clip-padding bg-no-repeat border-solid border border-grey-light transition ease-in-out"
              aria-label=".form-select-sm example"
              placeholder="Geschlecht"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option value="undefined">Bitte Geschlecht wählen...</option>
              <option value="m">Mann</option>
              <option value="f">Frau</option>
              <option value="d">Divers</option>
            </select>

            <label className="text-gray-400">Geburtsdatum</label>
            <input
              type="date"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="birthdate"
              onChange={(e) => setBirthdate(e.target.value)}
              value={birthdate}
            />

            <input
              type="integer"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="age"
              placeholder="Alter"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <form className="w-full">
              <label className="text-gray-400">
                Interessen
                <textarea
                  className="block border border-grey-light text-black w-full p-3 rounded mb-4"
                  rows={3}
                  placeholder="Hier notieren..."
                  onChange={(e) => setInterests(e.target.value)}
                  value={interests}
                ></textarea>
              </label>
            </form>

            <select
              className="form-select form-select-sm text-gray-400 appearance-none block w-full p-3 rounded mb-4 font-light bg-white bg-clip-padding bg-no-repeat border-solid border border-grey-light transition ease-in-out"
              aria-label=".form-select-sm example"
              placeholder="Sprachtherapeutische Diagnose"
              onChange={(e) => setDiagnose(e.target.value)}
              value={diagnose}
            >
              <option value="undefined">
                Sprachtherapeutische Diagnose...
              </option>
              <option value="c">Zentrale Fazialisparese</option>
              <option value="p">Periphere Fazialisparese</option>
            </select>

            <select
              className="form-select form-select-sm text-gray-400 appearance-none block w-full mb-4 p-3 rounded font-light bg-white bg-clip-padding bg-no-repeat border-solid border border-grey-light transition ease-in-out"
              aria-label=".form-select-sm example"
              placeholder="Betroffene Seite"
              onChange={(e) => setAffectedSide(e.target.value)}
              value={affectedSide}
            >
              <option value="undefined">Betroffene Seite...</option>
              <option value="l">Linke Seite</option>
              <option value="r">Rechte Seite</option>
              <option value="b">Beide Seiten</option>
            </select>

            <form className="w-full">
              <label className=" text-gray-400">
                Bewegungsausmaß eingeschränkt bzw. reduziert bei folgender
                Muskulatur:
                <textarea
                  className="block border border-grey-light w-full text-black p-3 rounded mb-4"
                  rows={3}
                  placeholder="Hier notieren..."
                  onChange={(e) => setMuscles(e.target.value)}
                  value={muscles}
                ></textarea>
              </label>
            </form>

            <select
              className="form-select form-select-sm text-gray-400 appearance-none block w-full p-3 rounded mb-4 font-light bg-white bg-clip-padding bg-no-repeat border-solid border border-grey-light transition ease-in-out"
              aria-label=".form-select-sm example"
              placeholder="Taubheitsgefühl"
              onChange={(e) => setNumbness(e.target.value)}
              value={numbness}
            >
              <option value="undefined">Taubheitsgefühl?...</option>
              <option value="y">ja</option>
              <option value="n">nein</option>
            </select>

            <button
              type="submit"
              className="mt-4 mb-3 w-full bg-white hover:bg-gray-200 text-black border-solid border-2 border-black py-2 rounded-md transition duration-100"
              onClick={sendValues}
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
