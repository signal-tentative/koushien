import "./header.css";
import { Theme } from "./Theme";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { atomSettingModal } from "../atoms";

import SettingModal from "../modal/SettingModal";
import * as React from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export function Header() {
  const [openS, setOpenS] = React.useState(false);
  const handleOpenS = () => setOpenS(true);
  const handleCloseS = () => setOpenS(false);

  const [userMode, setUserMode] = useAtom(atomUserMode);
  // userMode如何でCSSの適応を変更する

  const nav = useNavigate();

  const handleSettingModal = () => {
    handleOpenS();
  };

  return (
    <div className={`dashmanheader ${!userMode ? "instructer" : "student"}`}>
      <Theme userMode={userMode} />
      <div className={`headerBtn ${!userMode ? "instructer" : "student"}`}>
        <div className="switchBtn">
          <AutorenewIcon
            d="switchImage"
            className={`${!userMode ? "instructer" : "student"}`}
            style={{ width: "30px", height: "79px", paddingRight: "5px" }}
            onClick={() => {
              // モーダルを表示する必要があ
            }}
          ></AutorenewIcon>
          <div
            className={`header-text ${!userMode ? "instructer" : "student"}`}
            onClick={() => {
              setUserMode(!userMode);
            }}
          >
            {userMode ? "受講生" : "講師"}
          </div>
        </div>

        <SettingsIcon
          id="settingBtn"
          className={`${!userMode ? "instructer" : "student"}`}
          onClick={() => {
            handleSettingModal();
          }}
        ></SettingsIcon>
        <LogoutIcon
          id="logoutBtn"
          className={`${!userMode ? "instructer" : "student"}`}
          onClick={() => {
            localStorage.clear();
            nav("/");
          }}
        ></LogoutIcon>
      </div>
      <Modal
        open={openS}
        onClose={handleCloseS}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SettingModal handleClose={handleCloseS} setOpen={setOpenS} />
      </Modal>
    </div>
  );
}
