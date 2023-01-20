import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const comment = () => {
  var [comments, setComments] = useState([]);
  var [addComment, setAddComment] = useState("");
  var router = useRouter();
  var index = router.query.index;

  useEffect(() => {
    if (!router.isReady) return; // wait for router to be ready
    // Send a request to the server to get the comments
    try {
      Axios.post("/api/get-comments", { index: index }).then((res) => {
        console.log(res.data);
        setComments(res.data);
      });
    } catch (error: any) {
      console.log("Es konnten keine Patienten geladen werden");
    }
  }, [router.isReady]);

  const deleteCommentHandler = (id: any) => {
    try {
      Axios.post("/api/delete-comment", {
        index: index,
        id: id,
      }).then(() => {
        refreshPage();
      });
    } catch (error: any) {
      console.log("Es konnten keine Patienten geladen werden");
    }
  };

  const editCommentHandler = (id: any) => {
    try {
      Axios.post("/api/edit-comment", {
        index: index,
        id: id,
        comment: addComment,
      }).then((res) => {
        console.log(res.data);
        setComments(res.data);
      });
    } catch (error: any) {
      console.log("Es konnten keine Patienten geladen werden");
    }
  };

  return (
    <div className="mx-3">
      {typeof comment === "undefined" ? (
        <div>loading...</div>
      ) : (
        comments
          .filter((comment: any) => comment.patientID == index)
          .map((comment: any) => (
            <div key={comment.ID} className="text-sm m-2 font-normal">
              {comment.commentContent}
              <div>
                <div className="flex">
                  <div className="text-xs font-thin pr-2">
                    {dateTimeHelper(comment.commentTime)}
                  </div>
                  <button
                    onClick={() => deleteCommentHandler(comment.commentID)}
                    className="text-xs font-thin underline pr-2"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default comment;

const refreshPage = () => {
  window.location.reload();
};

const dateTimeHelper = (date: any) => {
  var today = new Date(date);
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var hour = today.getHours();
  var minute = today.getMinutes();
  var second = today.getSeconds();
  var time =
    day + "." + month + "." + year + " " + hour + ":" + minute + ":" + second;
  return time;
};
