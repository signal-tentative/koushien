import SettingModal from "../modal/SettingModal";
import * as React from "react";
import "./List.css";

import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";

import CreateLectureModal from "../modal/CreateLectureModal";
import AddLectureModal from "../modal/AddLectureModal";
import { data } from "react-router";
//whichには右側か左側かが入ってくる
function ListRight() {
  const [openLL, setOpenLL] = React.useState(false);
  const [UserMode, setUserMode] = useAtom(atomUserMode);
  const handleOpenLL = () => setOpenLL(true);
  const handleCloseLL = () => setOpenLL(false);
  const uid = localStorage.getItem("user_uid");

  const [data, setData] = useState([]);

  let studentData = [];

  const handleListModal = () => {
    handleOpenLL();
  };

  useEffect(() => {
    if (!UserMode) {
      const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
        .then((response) => response.json())
        .then((datas) => {
          console.log(datas);
          setData(datas);
        });
    } else {
      const user = fetch(`${import.meta.env.VITE_API_URL}/students/uid/${uid}`)
        .then((response) => response.json())
        .then((datas) =>
          datas.map((data) => {
            fetch(`${import.meta.env.VITE_API_URL}/lectures/${data.id}`)
              .then((response) => response.json())
              .then((stuData) => {
                console.log(stuData);
                studentData.push(stuData);
              });
          }, setData(studentData)),
        )
        .then(() => {
          setData(studentData);
        });
    }
  }, [UserMode]);

  return (
    <>
      <div className="List">
        {data.map((data) => {
          if (data.execute === false) {
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
            //     handleListModal();
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
            <div className="ListContainer">
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
        <AddLectureModal handleClose={handleCloseLL} setOpen={setOpenLL} />
      </Modal>
    </>
  );
}

export default ListRight;
