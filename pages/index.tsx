import React from "react";
import Patientlist from "../components/patient-list/Patientlist";

const index = () => {
  return (
    <div className="flex flex-col md:flex-row flex-1 font-light scss-syntax">
      {/* Patient Select */}

      <Patientlist />

      {/* Patient Screen */}

      <div style={{ background: "#ffffff" }} className="m-4 rounded-2xl w-full">
        <div className="m-4 mt-10 grid justify-center">
          <div>Kein Patient ausgewählt</div>
        </div>
      </div>
    </div>
  );
};

export default index;
