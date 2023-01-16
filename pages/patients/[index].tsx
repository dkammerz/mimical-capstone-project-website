import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import PatientList from "../../components/patient-list-left-side/Patientlist";
import PatientData from "../../components/patient-data/Patientdata";
import Charts from "../../components/chartjs/charts";
import Popup from "reactjs-popup";

// Dynamic Patient Page

const index = () => {
  const [patients, setPatients] = useState([]);
  var router = useRouter();
  var index = router.query.index;

  var [comment, setComment] = useState([]);
  var [addComment, setAddComment] = useState("");
  var [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      Axios.get("/api/patient-data").then((res) => {
        setPatients(res.data);
      });
    } catch (error: any) {
      error;
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    try {
      Axios.post("/api/get-comments", { index: index }).then((res) => {
        console.log(res.data);
        setComment(res.data);
      });
    } catch (error: any) {
      console.log("Es konnten keine Patienten geladen werden");
    }
  }, [router.isReady]);

  const addCommentHandler = () => {
    try {
      Axios.post("/api/add-comment", {
        index: index,
        comment: addComment,
      }).then((res) => {
        console.log(res.data);
        setComment(res.data);
      });
    } catch (error: any) {
      console.log("Es konnten keine Patienten geladen werden");
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 font-light scss-syntax">
      {/* Patient Select */}
      <PatientList />
      {/* Patient Screen */}

      <div
        style={{ background: "#ffffff" }}
        className="m-4 h-screen rounded-2xl justify-start w-full shadow-lg scrollbar-hide overflow-y-scroll"
      >
        <PatientData />
        <div className="m-5 bg-black/10 rounded-lg">
          <div className="m-5 font-bold">
            Bewegungsausmaß eingeschränkt bzw. reduziert bei folgender
            Muskulatur:
            <div className="font-light">
              {typeof patients === "undefined" ? (
                <div>loading...</div>
              ) : (
                patients
                  .filter((patient: any) => patient.ID == index)
                  .map((patient: any) => (
                    <div key={patient.ID} className="text-sm">
                      {patient.limitations}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
        <div className="m-5 test bg-black/10 rounded-lg">
          <div className="m-5 font-bold">
            Notizen:
            <div id={"mydiv"} className="font-light">
              {typeof patients === "undefined" ? (
                <div>loading...</div>
              ) : (
                patients
                  .filter((patient: any) => patient.ID == index)
                  .map((patient: any) => (
                    <div key={patient.ID} className="text-sm">
                      {patient.interests}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-black/10 rounded-lg m-5">
          {/* ChartJS Component */}
          <div className="mx-5 mt-2 font-bold">
            Patienteninfos:
            <div>
              <Charts />
            </div>
          </div>
        </div>

        <div className="m-5 test bg-black/10 rounded-lg">
          <div className="flex">
            <div className="m-5 font-bold">Kommentare:</div>
            <div className="mt-5 scss-syntax">
              <button
                onClick={() => setOpen(true)}
                className="hover:underline font-light text-sm"
              >
                Kommentar hinzufügen
              </button>
              {/* HIER POPUP MACHEN DANN!!!! */}
              <Popup
                open={open}
                closeOnDocumentClick
                modal
                onClose={() => setOpen(false)}
              >
                <div
                  className="justify-items-center items-center text-center
              "
                >
                  <div>
                    {/* <input hidden /> */}
                    <label className="scss-syntax">
                      Bitte Kommentar eingeben:
                    </label>
                    <textarea
                      className="scss-syntax font-extralight mt-2 py-2 w-full rounded-lg text-center
                    "
                      onChange={(e) => {
                        setAddComment(e.target.value);
                      }}
                      value={addComment}
                    ></textarea>
                  </div>
                  <button
                    onClick={addCommentHandler}
                    className="mt-4 mb-3 px-2 bg-white hover:bg-gray-200 font-light border-solid border-2 border-black py-2 rounded-md transition duration-100 scss-syntax"
                  >
                    Kommentar hinzufügen
                  </button>
                </div>
              </Popup>
            </div>
          </div>
          <div>
            <div className="mx-5">
              {typeof comment === "undefined" ? (
                <div>loading...</div>
              ) : (
                comment
                  .filter((comment: any) => comment.patientID == index)
                  .map((comment: any) => (
                    <div key={comment.ID} className="text-sm m-2 font-normal">
                      {comment.commentContent}
                      <div>
                        <div className="text-xs font-thin">
                          {dateTimeHelper(comment.commentTime)}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

function dateTimeHelper(datetime: String) {
  var date = datetime;
  var year = date.substring(0, 4);
  var month = date.substring(5, 7);
  var day = date.substring(8, 10);
  var hour = date.substring(11, 13);
  var min = date.substring(14, 16);
  var sec = date.substring(17, 19);
  return day + "." + month + "." + year + " " + hour + ":" + min + ":" + sec;
}
