import { useState, useEffect } from "react";
import q_ta from "/public/Signal-2.png";

function LiveHeader({ lecture_id }) {
  const uid = localStorage.getItem("user_uid");
  const [lecture, setLecture] = useState();

  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/${lecture_id}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        setLecture(datas);
      });
  }, []);
  console.log(lecture);
  return (
    <>
      <div className="liveheader">
        <div className="headerTitle">
          <img id="LiveQ_ta" src={q_ta} alt="bookIcon" />
          <p id="headerTitle">まなびのシグナル</p>
        </div>
        <div id="headertag">
          <p id="livenow">⚫︎</p>
          <p id="livetitle">-{lecture?.title}</p>
        </div>
      </div>
    </>
  );
}

export default LiveHeader;
