import { divide } from "firebase/firestore/pipelines";
import { useState } from "react";
import FileSelectURL from "./pdf/FileSelectURL";
import PointTitle from "./liveheader/PointTitle";
import RealTimeFB from "./fb/RealTimeFB";
import Script from "./script/Script";
import LiveHeader from "./LiveHeader";
import Recording from "./recording/Recording";
import "./live.css";
import { useNavigate } from "react-router";
function Live() {
  const navigate = useNavigate();

  function handleEnd() {
    const endJudge = window.confirm("講義を終了しますか？");
    if (endJudge) navigate("/dashman");
    console.log("End");
  }

  return (
    <>
      <LiveHeader />
      <div className="Screen">
        <div id="ScreenLeft">
          <FileSelectURL />
          <div>
            <Recording />
          </div>
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
