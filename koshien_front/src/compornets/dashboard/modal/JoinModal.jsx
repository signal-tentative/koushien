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

function JoinModal({ handleClose, SelectLecture }) {
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
  console.log("selectLecture", SelectLecture);
  const data = SelectLecture;
  console.log("これでーた", data);
  let month;

  //講義タイトル
  const title = data?.title;
  //講義コード
  const code = data?.code;
  //講師名
  const teacher = data.user.name;
  //説明
  const discription = data?.description;
  //開始時刻
  const startTimes = data?.startDate?.split("T")[1];
  const startparts = startTimes?.split(":");
  const startTime = `${startparts[0]}:${startparts[1]}`;
  //終了時刻
  const timePart = data?.endDate?.split("T")[1];
  const endparts = timePart?.split(":");
  const endTime = `${endparts[0]}:${endparts[1]}`;
  //年
  const year = data?.startDate?.slice(0, 4);
  //月
  if (data?.startDate[5] == "0") {
    month = data?.startDate[6];
  } else {
    month = data?.startDate[5] + data?.startDate[6];
  }
  //日
  const day = data?.startDate[8] + data?.startDate[9];

  return (
    <>
      <div className="board JoinModal">
        <div className="">
          <div className="JoinTitle">
            <p style={{ paddingLeft: "30%" }}>講義名:{title}</p>{" "}
            <DeleteIcon style={{ marginLeft: "20px", color: "#006693" }} />
            <p
              onClick={handleCloseBtn}
              style={{ marginLeft: "auto", paddingRight: "40px" }}
            >
              ×
            </p>
          </div>
          <p className="JoinCode">講義コード:{code}</p>
        </div>

        <div id="borderline"></div>

        <div id="column" style={{ width: "94%", height: "60px" }}>
          <div className="SMTitle2">講義情報</div>
          <div id="between-left2">
            <div id="between-left-left">
              <p className="SMtext">講師</p>
              <p className="SMtext">実施日付</p>
            </div>
            <div id="between-left-right">
              <p className="SMtext2">{teacher}</p>
              <p className="SMtext2">
                {year}年{month}月{day}日 {startTime}-{endTime}
              </p>
            </div>
          </div>
        </div>
        <div id="explanationFrame">
          <p className="SMTitle">説明</p>
          <p className="SMtext3">{discription} </p>
        </div>
        <div id="borderline"></div>

        <div>
          <button className="saveBtn" onClick={handleSave}>
            講義に参加する
          </button>
        </div>
      </div>
    </>
  );
}
export default JoinModal;
