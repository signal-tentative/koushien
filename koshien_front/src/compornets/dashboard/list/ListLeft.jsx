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
  const uid = localStorage.getItem("user_uid");

  const [openLL, setOpenLL] = React.useState(false);
  const [openSM, setOpenSM] = React.useState(false);
  const [data, setData] = useState([
    {
      title: "ゴラア",
      startDate: "2026-02-12T12:22:22",
      endDate: "2026-02-12T14:22:22",
    },
  ]);

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

  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        setData(datas);
      });
  }, []);

  return (
    <>
      <div className="List">
        {data.map((data) => {
          if (data.execute === true) {
            return;
          }
          // //日付
          const datePart = data.startDate.split("T")[0];

          const parts = datePart.split("-");

          const result = `${parts[1]}/${parts[2]}`;

          //開始時刻
          const startTimes = data.startDate.split("T")[1];

          const startparts = startTimes.split(":");

          const startTime = `${startparts[0]}:${startparts[1]}`;

          //終了時刻
          const timePart = data.endDate.split("T")[1];

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
              className="ListContainer"
              onClick={() => {
                UserMode ? handleListModal() : handleListModalSM();
              }}
            >
              {/* <img className="thumbnail" src={data.img} alt="サムネ"></img> */}

              <p className="ListTitle">{data.title}</p>
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
        <JoinModal handleClose={handleCloseLL} setOpen={setOpenLL} />
      </Modal>

      <Modal
        open={openSM}
        onClose={handleCloseSM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StartModal handleClose={handleCloseSM} setOpen={setOpenSM} />
      </Modal>
    </>
  );
}

export default ListLeft;
