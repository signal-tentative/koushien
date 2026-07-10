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

function JoinModal({ handleClose }) {
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
          <div className="JoinTitle">
            <p>講義名:XXXXXX</p>{" "}
            <DeleteIcon style={{ paddingLeft: "10px", color: "#006693" }} />
          </div>
          <p className="JoinCode">講義コード:TYT-178258</p>
          <p onClick={handleCloseBtn}>×</p>
        </div>

        <div id="borderline"></div>

        <div className="JoinInfoContainer">
          <div className="">
            <p>講師</p>
            <p>講師</p>
            <p>講師</p>
          </div>
          <div>
            <p>講師</p>
            <p>講師</p>
          </div>
        </div>
        <div className="inputDateContainer">
          <p>説明</p>
          <p>講師</p>
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
