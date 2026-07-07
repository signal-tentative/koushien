import "./Schedule.css";
import { useState } from "react";
//whichには右側か左側かが入ってくる
function Schedule(data, user) {
  const [userSide, setUserSide] = useState("受講予定の講義一覧");
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
    if (user === jukousha) {
      setSide("受講予定の講義一覧");
    }
  }

  return (
    <>
      <div className="container">
        <div id="title">
          <p id="text">受講予定の講義一覧</p>
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
