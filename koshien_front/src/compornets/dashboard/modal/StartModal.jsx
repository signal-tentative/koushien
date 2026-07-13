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

function StartModal({ handleClose }) {
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

  return (
    <>
      <div className="board JoinModal">
        <div className="">
          <div className="JoinTitle">
            <p>講義名:START</p>
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
                <p lassName="SMtext">実施時間</p>
              </div>
              <div id="between-left-right">
                <p lassName="SMtext">田中 誠一</p>
                <p lassName="SMtext">2026年7月10日（金）11:00~12:00</p>
              </div>
              <div className="SMTitle">講義情報</div>
            </div>
            <div id="between-right">
              <p className="SMTitle">講義コード</p>
              <p id="SMCode">TYT</p>
              <p id="coppy">📁floatしよ</p>
            </div>
          </div>
          <div id="explanationFrame">
            <p className="SMTitle">説明</p>
            <p className="SMtext">
              トヨタのマルチパスウェイ戦略の基礎概念と実践的な取り組みについて学びます。
            </p>
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
