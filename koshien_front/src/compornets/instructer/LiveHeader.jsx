import { useState } from "react";

function LiveHeader() {
  return (
    <>
      <div className="liveheader">
        <div className="liveheaderleft">
          <div
            className="left"
            style={{
              color: "green",
              fontSize: "30px",
            }}
          >
            ・
          </div>
          <div
            className="left"
            style={{
              color: "black",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "700",
            }}
          >
            配信中
          </div>
          <div className="left">ーマルチパスウェイ戦略入門</div>
        </div>
        <div className="liveheaderright">
          <div>0:02</div>
          <div>23名受講中</div>
        </div>
      </div>
    </>
  );
}

export default LiveHeader;
