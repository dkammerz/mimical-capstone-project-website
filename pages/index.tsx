import React, { use, useEffect } from "react";
import Patientlist from "../components/patient-list-left-side/Patientlist";
import { useRouter } from "next/router";
import axios from "axios";

const index = () => {
  const router = useRouter();

  // useEffect(() => {
  //   axios.get("http://localhost:3000/api/authenticate").then((res) => {
  //     if (res.data === false) {
  //       router.push("/login");
  //     }
  //   });
  // }, []);

  return (
    <div className="flex flex-col md:flex-row flex-1 font-light scss-syntax">
      {/* Patient Select */}

      <Patientlist />

      {/* Patient Screen */}

      <div
        style={{ background: "#ffffff" }}
        className="m-4 rounded-2xl w-full shadow-lg"
      >
        <div className="m-4 mt-10 grid justify-center">
          <div>Kein Patient ausgewählt</div>
        </div>
      </div>
    </div>
  );
};

export default index;
