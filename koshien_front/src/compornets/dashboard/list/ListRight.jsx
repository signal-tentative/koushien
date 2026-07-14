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
  const handleOpenLL = () => setOpenLL(true);
  const handleCloseLL = () => setOpenLL(false);
  const uid = localStorage.getItem("user_uid");

  const [data, setData] = useState([]);

  const handleListModal = () => {
    handleOpenLL();
  };

  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        setData(datas);
      });
  }, []);

  const dataf = [
    {
      img: "img",
      title: "xxxxxxxxx",
      date: "06/11",
      start_time: "16:00",
      end_time: "18:00",
    },
    {
      img: "img",
      title: "xxxxxxxxx",
      date: "06/11",
      start_time: "16:00",
      end_time: "18:00",
    },
    {
      img: "img",
      title: "xxxxxxxxx",
      date: "06/11",
      start_time: "16:00",
      end_time: "18:00",
    },
    {
      img: "img",
      title: "xxxxxxxxx",
      date: "06/11",
      start_time: "16:00",
      end_time: "18:00",
    },
    {
      img: "img",
      title: "xxxxxxxxx",
      date: "06/11",
      start_time: "16:00",
      end_time: "18:00",
    },
    {
      img: "img",
      title: "xxxxxxxxx",
      date: "06/11",
      start_time: "16:00",
      end_time: "18:00",
    },
    {
      img: "img",
      title: "xxxxxxxxx",
      date: "06/11",
      start_time: "16:00",
      end_time: "18:00",
    },
    {
      img: "img",
      title: "xxxxxxxxx",
      date: "06/11",
      start_time: "16:00",
      end_time: "18:00",
    },
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
        <AddLectureModal handleClose={handleCloseLL} setOpen={setOpenLL} />
      </Modal>
    </>
  );
}

export default ListRight;
