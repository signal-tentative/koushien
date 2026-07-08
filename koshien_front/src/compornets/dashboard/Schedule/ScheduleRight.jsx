import "./ScheduleRight.css";
import { useState, useEffect } from "react";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";
//userには講師かユーザかどっちかが入る
function ScheduleRight(data) {
  const [side, setSide] = useState("");
  const [info, setInfo] = useState("");
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
  useEffect(() => {
    if (userMode === false) {
      setSide("実施済みの講義一覧");
      setInfo("黄色はまとめができている講義だよ");
      console.log("講師");
    } else {
      setSide("受講済みの講義一覧");
      setInfo("お疲れ様！");
      console.log("受講生");
    }
  }, [userMode]);

  console.log(userMode);
  return (
    <>
      <div className="containerr">
        <div id="title">
          <p id="text">{side}</p>
          <div id="info">
            <p id="infoText">{info}</p>
          </div>
          <img src="Q_ta_wao.png" alt="Q太" id="Q_ta_wao"></img>
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

export default ScheduleRight;
