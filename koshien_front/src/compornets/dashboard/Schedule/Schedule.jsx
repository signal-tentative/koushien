import "./Schedule.css";
import { useState, useEffect } from "react";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";
//whichには右側か左側かが入ってくる
function Schedule(data, user) {
  const [side, setSide] = useState("");
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
  }
  useEffect(() => {
    if (userMode === false) {
      setSide("実施予定の講義一覧");
    } else {
      setSide("受講予定の講義一覧");
    }
  }, [userMode]);

  return (
    <>
      <div className="container">
        <div id="title">
          <p id="text">{side}</p>
        </div>
        <div className="name">
          <p id="classTitle">講義タイトル</p>
          <p id="classDate">実施日時</p>
        </div>
        <ul className="classList">classList</ul>
      </div>
    </>
  );
}

export default Schedule;
