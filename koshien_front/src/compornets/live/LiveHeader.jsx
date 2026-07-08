import { useState } from "react";
import q_ta from "/public/Signal-2.png";

function LiveHeader() {
  return (
    <>
      <div className="liveheader">
        <div className="headerTitle">
          <img id="LiveQ_ta" src={q_ta} alt="bookIcon" />
          <p id="headerTitle">まなびのシグナル</p>
        </div>
        <div id="headertag">
          <p id="livenow">⚫︎</p>
          <p id="livetimer">00:00</p>
          <p id="livetitle">-マルチパスウェイ戦略入門</p>
        </div>
      </div>
    </>
  );
}

export default LiveHeader;
