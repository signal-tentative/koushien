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
function ScriptList() {
  const [UserMode, setUserMode] = useAtom(atomUserMode);

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

  const data = [
    {
      script: "こんち",
    },
    { script: "こんにちは" },
    { script: "こんにちは" },
    {
      script:
        "こんにちはああああああああああああああああああああああああああああああああああああああああああ",
    },
    { script: "こんにちは" },
    { script: "こんにちは" },
    { script: "こんにちは" },
    { script: "こんにちは" },
    { script: "こんにちは" },
  ];
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
        {data.map((data, index) => {
          return (
            <div className="ScriptListContainer">
              <p className="ScriptNumber">{index}</p>
              <p className="ListTitle">{data.script}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ScriptList;
