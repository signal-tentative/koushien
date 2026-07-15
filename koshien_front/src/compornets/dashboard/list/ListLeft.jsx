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
function ListLeft() {
  const [UserMode, setUserMode] = useAtom(atomUserMode);
  const [SelectData, setSelectData] = useState("");

  const uid = localStorage.getItem("user_uid");

  const [openLL, setOpenLL] = React.useState(false);
  const [openSM, setOpenSM] = React.useState(false);
  const [lecData, setLecData] = useState([]);
  const [url, setUrl] = useState("");

  const handleOpenLL = () => setOpenLL(true);
  const handleCloseLL = () => setOpenLL(false);

  const handleOpenSM = () => setOpenSM(true);
  const handleCloseSM = () => setOpenSM(false);

  function handleListModal(ele) {
    console.log(ele);
    setSelectData(ele);
    handleOpenLL();
  }
  function handleListModalSM(ele) {
    setSelectData(ele);
    handleOpenSM();
  }

  useEffect(() => {
    if (!UserMode) {
      const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
        .then((response) => response.json())
        .then((instructerData) => {
          setLecData(instructerData);
        });
    } else {
      const user = fetch(`${import.meta.env.VITE_API_URL}/students/uid/${uid}`)
        .then((response) => response.json())
        .then((jsonData) => {
          return Promise.all(
            jsonData.map((firstData) =>
              fetch(
                `${import.meta.env.VITE_API_URL}/lectures/${firstData.lecture.id}`,
              ).then((response) => response.json()),
            ),
          );
        })
        .then((setData) => {
          setLecData(setData);
        });
    }
  }, [UserMode]);
  useEffect(() => {
    const response = fetch(
      `${import.meta.env.VITE_API_URL}/lectures/code/${data.id}`,
    )
      .then((data) => {
        data.json();
      })
      .then((jsonData) => {
        console.log("jsonデータ確認", jsonData);
        setUrl(jsonData);
      });
  }, []);
  console.log(data.id);
  console.log(url);
  return (
    <>
      <div className="List">
        {lecData.map((mapData, ind) => {
          console.log("マップデータ", mapData);
          if (mapData.execute === true) {
            return;
          }
          //日付

          const datePart = mapData.startDate.split("T")[0];

          const parts = datePart.split("-");

          const result = `${parts[1]}/${parts[2]}`;

          //開始時刻
          const startTimes = mapData.startDate.split("T")[1];

          const startparts = startTimes.split(":");

          const startTime = `${startparts[0]}:${startparts[1]}`;

          //終了時刻
          const timePart = mapData.endDate.split("T")[1];

          const endparts = timePart.split(":");

          const endTime = `${endparts[0]}:${endparts[1]}`;

          return (
            // <div
            //   className="ListContainer"
            //   onClick={() => {
            //     UserMode ? handleListModal() : handleListModalSM();
            //   }}
            // >
            //   <img className="thumbnail" src={data.img} alt="サムネ"></img>
            //   <p className="ListTitle">{data.title}</p>
            //   <div className="ListDateAndTime">
            //     <p className="ListDate">{data.date}</p>
            //     <p className="ListTime">
            //       {data.start_time} - {data.end_time}
            //     </p>
            //   </div>
            // </div>
            <div
              key={mapData.id}
              className="ListContainer"
              onClick={() => {
                console.log(lecData);
                console.log;
                UserMode
                  ? handleListModal(mapData)
                  : handleListModalSM(mapData);
              }}
            >
              {/* <img className="thumbnail" src={data.img} alt="サムネ"></img> */}
              <p className="ListTitle">{mapData.title}</p>
              <div className="ListDateAndTime">
                <p className="ListDate">{result}</p>
                <p className="ListTime">
                  {startTime} - {endTime}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={openLL}
        onClose={handleCloseLL}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <JoinModal handleClose={handleCloseLL} SelectLecture={SelectData} />
      </Modal>

      <Modal
        open={openSM}
        onClose={handleCloseSM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StartModal handleClose={handleCloseSM} SelectLecture={SelectData} />
      </Modal>
    </>
  );
}

export default ListLeft;
