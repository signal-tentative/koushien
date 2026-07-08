import "./Schedule.css";
import { useState } from "react";
import SettingModal from "../modal/SettingModal";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import CreateLectureModal from "../modal/CreateLectureModal";
//whichには右側か左側かが入ってくる
function Schedule(data, user) {
  const [openC, setOpenC] = React.useState(false);
  const handleOpenC = () => setOpenC(true);
  const handleCloseC = () => setOpenC(false);

  const handleCreateLectureModal = () => {
    handleOpenC();
  };

  const [userSide, setUserSide] = useState("受講予定の講義一覧");
  async function list() {
    const classList = data.map(({ img, title, date, start_time, end_time }) => {
      <li className="class">
        <img src={img} alt="イメージ"></img>
        <p>{title}</p>
        <div className="date">
          <p>{data}</p>
          <p>
            {start_time} - {end_time}
          </p>
        </div>
      </li>;
    });
    if (user === jukousha) {
      setSide("受講予定の講義一覧");
    }
  }

  return (
    <>
      <div className="container">
        <div id="title">
          <p id="text">受講予定の講義一覧</p>
        </div>
        <div className="name">
          <p id="classTitle">講義タイトル</p>
          <p id="classDate">実施日時</p>
        </div>
        <ul className="classList">classList</ul>
        <button
          id="CreateLectureBtn"
          onClick={() => {
            handleCreateLectureModal();
          }}
        >
          <p>open</p>
        </button>
        <Modal
          open={openC}
          onClose={handleCloseC}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateLectureModal handleClose={handleCloseC} setOpen={setOpenC} />
        </Modal>
      </div>
    </>
  );
}

export default Schedule;
