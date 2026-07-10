import "./ScheduleRight.css";
import { useState, useEffect } from "react";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ListRight from "../list/ListRight";
//userには講師かユーザかどっちかが入る
function ScheduleRight(data) {
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
    //trueが受講生falseが講師
  }

  return (
    <>
      <div className="containerr">
        <div id="titleS">
          <p id="text">
            {userMode ? "受講済みの講義一覧" : "実施済みの講義一覧"}
          </p>
        </div>
        <div className="nameS">
          <div className="classTitleS">講義タイトル</div>
          <div id="flexsase">
            <div className="classDateS">実施日時</div>
            <SyncAltIcon id="SyncAltIcon"></SyncAltIcon>
          </div>
        </div>
        <ListRight />
      </div>
    </>
  );
}

export default ScheduleRight;
