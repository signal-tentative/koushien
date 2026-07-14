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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ScriptList from "../list/ScriptList";
import Button from "@mui/material/Button";

function StartModal({ handleClose, SelectLecture }) {
  const [titlejotai, settitlejotai] = useState("default");
  const [explanationjotai, setexplanationjotai] = useState("default");
  const [uploadjotai, setuploadjotai] = useState("default");
  const [DeleteScreen, setDeleteScreen] = useState(false);
  const [CopyState, setCopyScreen] = useState(false);

  const [certTitle, setCertTitle] = useState("");
  const [certExplanation, setCertExplanation] = useState(""); //元の名前を入れておくべき

  function handleCloseBtn() {
    handleClose();
  }
  function handleCopyBtn() {
    console.log("Copy完了");
  }
  function handleEditBtn() {
    console.log("edit");
  }
  function handleDeleteIconBtn() {
    setDeleteScreen(true);
  }
  function handleDeleteBtn() {
    console.log("delete");
  }
  function handleDeleteCloseBtn() {
    setDeleteScreen(false);
  }

  function handleStart() {
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

  const data = SelectData;

  //講義タイトル
  const title = data.lecture.title;
  //講義コード
  const code = data.lecture.code;
  //説明
  const discription = data.lecture.discription;
  //開始時刻
  const startTimes = data.startDate.split("T")[1];

  const startparts = startTimes.split(":");

  const startTime = `${startparts[0]}:${startparts[1]}`;

  //終了時刻
  const timePart = data.endDate.split("T")[1];

  const endparts = timePart.split(":");

  const endTime = `${endparts[0]}:${endparts[1]}`;

  //年
  const year = data.startDate.slice(0, 3);
  //月
  if (data.startDate[5] == "0") {
    const month = data.startDate[6];
  } else {
    const month = data.startDate[5] + data.startDate[6];
  }
  //日
  const day = data.startDate[8] + data.startDate[9];

  return (
    <>
      <div className="board StartModal">
        <div>
          <div className="JoinTitle">
            <p>講義名:{SelectLecture.title}</p>
            <EditIcon
              style={{
                paddingLeft: "30%",
                paddingRight: "10%",
                color: "#006693",
              }}
              onClick={handleEditBtn}
            />
            {DeleteScreen ? (
              <div id="deleteFrame">
                <DeleteIcon
                  style={{ color: "#006693" }}
                  onClick={handleDeleteIconBtn}
                />
                <div className="board deleteScreen">
                  <p id="deleteText">講義を削除します。よろしいですか？</p>
                  <div id="deleteScreenBtn">
                    <button
                      id="grayNotDeleteBtn"
                      onClick={handleDeleteCloseBtn}
                    >
                      削除しない
                    </button>
                    <button id="redDeleteBtn" onClick={handleDeleteBtn}>
                      削除する
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div id="deleteFrame">
                <DeleteIcon
                  style={{ color: "#006693" }}
                  onClick={handleDeleteIconBtn}
                />
              </div>
            )}

            <p id="StartBatten" onClick={handleCloseBtn}>
              ×
            </p>
          </div>
        </div>

        <div id="borderline"></div>

        <div className="StartmodalFrame">
          <div className="InfoAndCode">
            <div id="between-left">
              <div id="between-left-left">
                <p className="SMTitle"> 講義情報</p>
                <p className="SMtext">講師</p>
                <p className="SMtext">実施時間</p>
              </div>
              <div id="between-left-right">
                <p></p>
                <p className="SMtext" style={{ paddingTop: "20px" }}>
                  {SelectLecture.name}
                </p>
                {/* </p>これは講師名だからuidから再度取得する必要がある？ */}
                <p className="SMtext ">2026年7月10日（金）11:00~12:00</p>
              </div>
            </div>
            <div id="between-right">
              <p className="SMTitle" style={{ marginRight: "20px" }}>
                講義コード
              </p>
              <p id="SMCode">{SelectLecture.code}</p>
              <p id="coppy" onClick={handleCopyBtn}>
                📁
              </p>
            </div>
          </div>

          <div id="explanationFrame">
            <p className="SMTitle">説明</p>
            <p className="SMtext" style={{ textAlign: "left" }}>
              {SelectLecture.description}
            </p>
          </div>

          <div id="materialsFrame">
            <p className="SMTitle">資料</p>
            <p className="SMtext" style={{ textDecorationLine: "underline" }}>
              資料
            </p>
          </div>

          <div id="scriptFrame">
            <p className="SMTitle">スクリプト</p>
            <ScriptList />
          </div>
        </div>
        <div id="borderline"></div>

        <div>
          <button
            className="StartBtn"
            // sx={{ background: " #ffca75", color: "black" }}
            onClick={handleStart}
          >
            講義を開始する
          </button>
        </div>
      </div>
    </>
  );
}
export default StartModal;
