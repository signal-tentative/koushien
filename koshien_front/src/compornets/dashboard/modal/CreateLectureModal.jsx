import { useAtom } from "jotai";
import { atomSettingModal } from "../atoms";
import { useState } from "react";
import "./modal.css";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function SettingModal({ handleClose }) {
  const [titlejotai, settitlejotai] = useState("default");
  const [explanationjotai, setexplanationjotai] = useState("default");
  const [uploadjotai, setuploadjotai] = useState("default");

  const [certTitle, setCertTitle] = useState("");
  const [certExplanation, setCertExplanation] = useState(""); //元の名前を入れておくべき

  function handleCloseBtn() {
    handleClose();
  }
  function handleSave() {
    if (!certTitle || !certExplanation) {
      if (!certTitle) {
        settitlejotai("error");
      }
      if (!certExplanation) {
        setexplanationjotai("error");
      }
      setuploadjotai("error");
      return;
    }
    //post
    console.log("create");
  }

  return (
    <>
      <div className="board CreateLectureModal">
        <div className="">
          <p>講義作成</p>
          <p onClick={handleCloseBtn}>🙅</p>
        </div>
        {titlejotai == "default" ? (
          <div className="inputAdress">
            <div className="inputTitle">講義タイトル</div>
            <input
              className="inputBox"
              type="text"
              placeholder="例：マルチパスウェイ戦略入門"
              onChange={(e) => setCertTitle(e.target.value)}
            />
          </div>
        ) : (
          <div className="inputContener">
            <div className="inputTitle" style={{ color: "red" }}>
              講義タイトル
            </div>
            <input
              className="errorinput"
              type="text"
              placeholder="例:マルチパスウェイ戦略入門"
              onChange={(e) => setCertTitle(e.target.value)}
            />
          </div>
        )}
        <div className="inputDateContainer">
          <LocalizationProvider
            className="inputDateContainer"
            dateAdapter={AdapterDayjs}
          >
            <DesktopDatePicker
              className="DatePicker"
              defaultValue={dayjs("2026-07-08")}
              style={{ width: "100px" }}
            />

            <TimePicker className="TimePicker" label="16:30" />
            <TimePicker className="TimePicker" label="17:30" />
          </LocalizationProvider>
        </div>

        {explanationjotai == "default" ? (
          <div className="inputAdress">
            <div className="inputTitle">説明</div>
            <input
              className="inputBox"
              type="text"
              placeholder="この講義についての説明"
              onChange={(e) => setCertExplanation(e.target.value)}
            />
          </div>
        ) : (
          <div className="inputContener">
            <div className="inputTitle" style={{ color: "red" }}>
              説明fal
            </div>
            <input
              className="errorinput"
              type="text"
              placeholder="この講義についての説明"
              onChange={(e) => setCertExplanation(e.target.value)}
            />
          </div>
        )}

        {uploadjotai == "default" ? (
          <div>
            <button className="saveBtn" onClick={handleSave}>
              変更を保存
            </button>
          </div>
        ) : (
          <div className="errorloginBox">
            <button className="saveBtn" onClick={handleSave}>
              変更を保存
            </button>
            <div className="redText" style={{ fontWeight: 300 }}>
              未入力項目があります。確認してください。
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default SettingModal;
