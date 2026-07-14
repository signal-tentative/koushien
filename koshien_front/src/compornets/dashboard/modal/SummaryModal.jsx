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
import ScriptList from "../list/ScriptList";
import Button from "@mui/material/Button";
import SummaryScroll from "./SummaryScroll";

function SummaryModal({ handleClose, SelectLecture }) {
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

  return (
    <>
      <div className="board StartModal">
        <div>
          <div className="JoinTitle">
            <p>講義名:{SelectLecture.title}</p>
            {DeleteScreen ? (
              <div id="deleteFrame">
                <DeleteIcon
                  style={{
                    paddingLeft: "30%",
                    paddingRight: "10%",
                    color: "#006693",
                  }}
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
              <div id="materialsFrame">
                <p className="SMTitle">資料</p>
                <p
                  className="SMtext"
                  style={{ textDecorationLine: "underline" }}
                >
                  資料
                </p>
              </div>
            </div>
            <div>
              <p>👤</p>
              <p>重要度順・受講生のもっと知りたいポイント</p>
            </div>
            <SummaryScrol SelectLecture={SelectLecture} />
          </div>
        </div>
      </div>
    </>
  );
}
export default SummaryModal;
