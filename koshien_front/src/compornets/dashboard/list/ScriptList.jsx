import SettingModal from "../modal/SettingModal";

import * as React from "react";
import "./List.css";

import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";

import JoinModal from "../modal/JoinModal";
import StartModal from "../modal/StartModal";

import { data } from "react-router";
//whichには右側か左側かが入ってくる
function ScriptList(documentId) {
  const [UserMode, setUserMode] = useAtom(atomUserMode);
  const scriptData = [];
  const [scriptList, setScriptList] = useState([]);
  const [num, setNum] = useState("");

  const [openLL, setOpenLL] = React.useState(false);
  const [openSM, setOpenSM] = React.useState(false);

  const handleOpenLL = () => setOpenLL(true);
  const handleCloseLL = () => setOpenLL(false);

  const handleOpenSM = () => setOpenSM(true);
  const handleCloseSM = () => setOpenSM(false);

  const handleListModal = () => {
    handleOpenLL();
  };
  const handleListModalSM = () => {
    handleOpenSM();
  };

  console.log(documentId.documentId);
  // setNum(documentId);
  useEffect(() => {
    if (!documentId || !documentId.documentId) {
      console.warn("documentId が存在しないため、リクエストをスキップしました");
      return;
    }
    const response = fetch(
      `${import.meta.env.VITE_API_URL}/scripts/${documentId.documentId}`,
    )
      .then((data) => data.json())
      .then((jsondata) => {
        console.log(jsondata);
        return jsondata;
      })
      .then((scriptArray) => {
        const sortedArray = [...scriptArray].sort((a, b) => {
          return (a.page || 0) - (b.page || 0);
        });

        sortedArray.map((scr) => {
          console.log(scr.script);
          scriptData.push({ script: scr.script });
          console.log(scriptData);
        });
        return scriptData;
      })
      .then((data) => setScriptList(data));
  }, [documentId]);

  function list() {
    data.map(({ img, title, date, start_time, end_time }) => {
      <>
        <li className="class">
          <img src={img} alt="イメージ"></img>
          <p>{title}</p>
          <div className="date">
            <p>{date}</p>
            <p>
              {start_time} - {end_time}
            </p>
          </div>
        </li>
      </>;
    });
  }

  return (
    <>
      <div className="ScriptList">
        {scriptList.map((data, index) => {
          return (
            <div className="ScriptListContainer">
              <p className="ScriptNumber">{index + 1}</p>
              <p className="ListTitle">{data.script}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ScriptList;
