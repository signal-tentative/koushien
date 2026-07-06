import { divide } from "firebase/firestore/pipelines";
import { useState } from "react";
import FileSelectURL from "./FileSelectURL";
import WhatGraph from "./WhatGraph";
import RealTimeFB from "./RealTimeFB";
import Script from "./Script";
import sikaku from "/public/sikaku.png";
import LiveHeader from "./LiveHeader";

function Live() {
  function handleEnd() {
    console.log("End");
  }

  return (
    <>
      <LiveHeader />
      <div className="yokoOneScreen">
        <div id="liveleft">
          <FileSelectURL />
          <Script />
        </div>
        <div id="liveright">
          <WhatGraph />
          <RealTimeFB />
          <div
            style={{
              padding: "24px",
              border: "2px solid #a9a9a9",
            }}
          >
            <button className="endBtn" onClick={handleEnd}>
              <img id="sikaku" src={sikaku} alt="sikaku" />
              講義を終了
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Live;
