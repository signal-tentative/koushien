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

  const handleListModal = () => {
    handleOpenLL();
  };
  const data = [
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
          return (
            <div
              className="ListContainer"
              onClick={() => {
                handleListModal();
              }}
            >
              <img className="thumbnail" src={data.img} alt="サムネ"></img>
              <p className="ListTitle">{data.title}</p>
              <div className="ListDateAndTime">
                <p className="ListDate">{data.date}</p>
                <p className="ListTime">
                  {data.start_time} - {data.end_time}
                </p>
              </div>
            </div>
          );
        })}

        <ul>s</ul>
        <button
          onClick={() => {
            handleListModal();
          }}
        >
          <p>講義を作成</p>
        </button>
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
