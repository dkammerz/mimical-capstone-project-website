import React from "react";
import PaginationTable from "../../components/table/PaginationTable";

// The patients page consists of a table with pagination and the Alle

const patients = () => {
  return (
    <div>
      <h1 className="text-4xl justify-center hidden lg:block font-extralight text-center">
        Alle Patienten
      </h1>
      <h1 className="text-4xl justify-center text-left block font-extralight ml-7 pt-4 pb-4 lg:hidden">
        Alle Patienten
      </h1>
      <div className="grid justify-items-center">
        <PaginationTable />
      </div>
    </div>
  );
};

export default patients;
