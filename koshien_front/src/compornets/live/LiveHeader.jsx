import { useState, useEffect } from "react";
import Logo from "/public/Logo3.png";

function LiveHeader() {
  const uid = localStorage.getItem("user_uid");
  const [lecture, setLecture] = useState();

  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        setLecture(datas[0]);
      });
  }, []);
  console.log(lecture);
  return (
    <>
      <div className="liveheader">
        <div className="headerTitle">
          <img src={Logo} style={{ height: "100%" }} alt="bookIcon" />
        </div>
        <div id="headertag">
          <p id="livenow">⚫︎</p>
          <p id="livetimer">00:00</p>
          <p id="livetitle">-{lecture?.title}</p>
        </div>
      </div>
    </>
  );
}

export default LiveHeader;
