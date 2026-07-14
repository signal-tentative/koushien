import "./Schedule.css";
import SettingModal from "../modal/SettingModal";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ListLeft from "../list/ListLeft";

import CreateLectureModal from "../modal/CreateLectureModal";
import AddLectureModal from "../modal/AddLectureModal";
//whichには右側か左側かが入ってくる
function Schedule(data, user) {
  const [openA, setOpenA] = React.useState(false);
  const handleOpenA = () => setOpenA(true);
  const handleCloseA = () => setOpenA(false);

  const [openC, setOpenC] = React.useState(false);
  const handleOpenC = () => setOpenC(true);
  const handleCloseC = () => setOpenC(false);

  const handleAddLectureModal = () => {
    handleOpenA();
  };
  const handleCreateLectureModal = () => {
    handleOpenC();
  };

  const [userSide, setSide] = useState("受講予定の講義一覧");
  const [userMode, setUserMode] = useAtom(atomUserMode);

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
  }
  useEffect(() => {
    if (userMode === false) {
      setSide("実施予定の講義一覧");
    } else {
      setSide("受講予定の講義一覧");
    }
  }, [userMode]);

  return (
    <>
      <div className="container">
        <div id="titleS">
          <p id="text">{userSide}</p>
        </div>
        <div className="nameS">
          <div className="classTitleS">講義タイトル</div>
          <div id="flexsase">
            <div className="classDateS">実施日時</div>
            <SyncAltIcon id="SyncAltIcon"></SyncAltIcon>
          </div>
        </div>
        <ListLeft />
        {userMode ? (
          <button
            id="CreateLectureBtn"
            onClick={() => {
              handleAddLectureModal();
            }}
          >
            講義を追加
          </button>
        ) : (
          <button
            id="CreateLectureBtn"
            onClick={() => {
              handleCreateLectureModal();
            }}
          >
            <p>講義を作成</p>
          </button>
        )}

        <Modal
          open={openA}
          onClose={handleCloseA}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddLectureModal handleClose={handleCloseA} setOpen={setOpenA} />
        </Modal>

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
