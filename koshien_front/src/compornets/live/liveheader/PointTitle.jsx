import { useState } from "react";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";

import AnnouncementIcon from "@mui/icons-material/Announcement";

function PointTitle() {
  return (
    <>
      <div id="PointTitle">
        <AnnouncementIcon
          style={{
            color: "#0d2d3a",
            width: "40px",
            position: "relative",
            top: "-23px",
            left: "140px",
          }}
        />
        <p id="siritaiText">受講生のもっと知りたいポイント</p>
      </div>
    </>
  );
}

export default PointTitle;
