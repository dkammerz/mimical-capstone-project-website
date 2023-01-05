import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const debug = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");

  const handleClick = async () => {
    const data = {
      password,
    };

    try {
      await axios.post("/debug-1", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick2 = async () => {
    try {
      await axios.post("/debug-2");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid justify-items-center scss-syntax mt-5">
      <div className="flex">
        <input
          type="text"
          placeholder="Passwort"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleClick}>BCRYPT</button>
      </div>
      <div className="flex">
        <button onClick={handleClick2}>Generate UUID</button>
      </div>
    </div>
  );
};

export default debug;
