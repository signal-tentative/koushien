import { useState } from "react";
import bookIcon from "/public/bookIcon.png";

function SignalHeader() {
  return (
    <>
      <div className="header">
        <div className="headerTitle">
          <img id="bookIcon" src={bookIcon} alt="bookIcon" />
          <h4>まなびのシグナル</h4>
        </div>
        <div className="left">
          <div className="bluetag">🎓講師</div>
          <div>グラフ📈</div>
        </div>
      </div>
    </>
  );
}

export default SignalHeader;
