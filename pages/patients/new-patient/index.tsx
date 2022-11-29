import { useEffect, useState } from "react";
import React from "react";
import Axios from "axios";
import Link from "next/link";

// Here a new patient is created and its values are safe in constants

const index = () => {
  const [prename, setPrename] = useState("");
  const [name, setName] = useState("");
  const [id, setID] = useState(Number);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState(Number);
  const [interests, setInterests] = useState("");
  const [diagnose, setDiagnose] = useState("");
  const [affectedSide, setAffectedSide] = useState("");
  const [limitations, setLimitations] = useState("");
  const [numbness, setNumbness] = useState("");

  const submit = async () => {
    const patient_data = {
      prename,
      name,
      id,
      email,
      gender,
      birthdate,
      age,
      interests,
      diagnose,
      affectedSide,
      limitations,
      numbness,
    };

    try {
      await Axios.post("/api/add-patient", patient_data);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="text-black font-light">
      <h1 className="grid justify-items-center text-4xl mb-5 mt-5">
        Neuen Patienten anlegen
      </h1>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <label className="text-gray-400">Vorname</label>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="prename"
              placeholder="Vorname"
              onChange={(e) => setPrename(e.target.value)}
              value={prename}
            />
            <label className="text-gray-400">Nachname</label>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Nachname"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <label className="text-gray-400">ID</label>
            <input
              type="integer"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="patient-id"
              placeholder="Patienten ID"
              onChange={(e) => setID(parseInt(e.target.value))}
              value={id}
            />
            <label className="text-gray-400">Geschlecht</label>
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
              <option value="w">Wallmart Bag</option>
            </select>

            <label className="text-gray-400">Geburtsdatum</label>
            <input
              type="date"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="birthdate"
              onChange={(e) => setBirthdate(e.target.value)}
              value={birthdate}
            />

            <label className="text-gray-400">Alter</label>
            <input
              type="integer"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="age"
              placeholder="Alter"
              onChange={(e) => setAge(parseInt(e.target.value))}
              value={age}
            />
            <label className="text-gray-400">Email</label>
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
            <label className="text-gray-400">
              Sprachtherapeutische Diagnose
            </label>
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
            <label className="text-gray-400">Betroffene Seite</label>
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
                  onChange={(e) => setLimitations(e.target.value)}
                  value={limitations}
                ></textarea>
              </label>
            </form>
            <label className="text-gray-400">Taubheit</label>
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

            <Link href="/">
              <button
                type="submit"
                className="mt-4 mb-3 w-full bg-white hover:bg-gray-200 text-black border-solid border-2 border-black py-2 rounded-md transition duration-100"
                onClick={submit}
              >
                Patienten anlegen
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
