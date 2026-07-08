import { divide } from "firebase/firestore/pipelines";
import { useState } from "react";
import FileSelectURL from "./pdf/FileSelectURL";
import PointTitle from "./liveheader/PointTitle";
import RealTimeFB from "./fb/RealTimeFB";
import Script from "./script/Script";
import LiveHeader from "./LiveHeader";
import "./live.css";

function Live() {
  function handleEnd() {
    console.log("End");
  }

  return (
    <>
      <LiveHeader />
      <div className="Screen">
        <div id="ScreenLeft">
          <FileSelectURL />
          <Script />
        </div>
        <div id="ScreenRight">
          <button className="endBtn" onClick={handleEnd}>
            講義を終了
          </button>
          <PointTitle />
          <RealTimeFB />
        </div>
      </div>
    </>
  );
}

export default Live;
