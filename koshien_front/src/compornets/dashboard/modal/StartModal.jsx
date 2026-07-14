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

function StartModal({ handleClose, SelectData }) {
  const [titlejotai, settitlejotai] = useState("default");
  const [explanationjotai, setexplanationjotai] = useState("default");
  const [uploadjotai, setuploadjotai] = useState("default");

  const [certTitle, setCertTitle] = useState("");
  const [certExplanation, setCertExplanation] = useState(""); //元の名前を入れておくべき

  function handleCloseBtn() {
    handleClose();
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
      <div className="board JoinModal">
        <div className="">
          <div className="JoinTitle">
            <p>講義名:{title}</p>
            <EditIcon style={{ paddingLeft: "10px", color: "#006693" }} />
            <DeleteIcon style={{ paddingLeft: "10px", color: "#006693" }} />
            <p onClick={handleCloseBtn}>×</p>
          </div>
        </div>

        <div id="borderline"></div>

        <div className="StartmodalFrame">
          <div className="between">
            <div id="between-left">
              <div id="between-left-left">
                <p lassName="SMtext">講師</p>
                <p lassName="SMtext">実施日付</p>
              </div>
              <div id="between-left-right">
                <p lassName="SMtext">田中 誠一</p>
                <p lassName="SMtext">
                  {year}年{month}月{day}日 {startTime}-{endTime}
                </p>
              </div>
              <div className="SMTitle">講義情報</div>
            </div>
            <div id="between-right">
              <p className="SMTitle">講義コード</p>
              <p id="SMCode">{code}</p>
              <p id="coppy">📁floatしよ</p>
            </div>
          </div>
          <div id="explanationFrame">
            <p className="SMTitle">説明</p>
            <p className="SMtext">{discription} </p>
          </div>
          <div id="materialsFrame">
            <p className="SMTitle">資料</p>
            <p>資料</p>
          </div>
        </div>
        <div id="borderline"></div>

        <div>
          <button className="saveBtn" onClick={handleStart}>
            講義を開始する
          </button>
        </div>
      </div>
    </>
  );
}
export default StartModal;
