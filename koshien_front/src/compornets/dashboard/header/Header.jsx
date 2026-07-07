import "./header.css";
import { Theme } from "./Theme";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export function Header() {
  const [userMode, setUserMode] = useAtom(atomUserMode);
  // userMode如何でCSSの適応を変更する

  return (
    <div className={`dashmanheader ${!userMode ? "instructer" : "student"}`}>
      <Theme />
      <div className={`headerBtn ${!userMode ? "instructer" : "student"}`}>
        <div className="switchBtn">
          <AutorenewIcon
            d="switchImage"
            className={`${!userMode ? "instructer" : "student"}`}
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
            // モーダルを表示する必要があ
          }}
        ></SettingsIcon>
        <LogoutIcon
          id="logoutBtn"
          className={`${!userMode ? "instructer" : "student"}`}
          onClick={() => {
            //ログアウトのfecth
          }}
        ></LogoutIcon>
      </div>
    </div>
  );
}
