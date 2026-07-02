import { useState } from "react";
import BeforeStartingModal from "./modal/BeforeStartingModal";
import { useAtom } from "jotai";
import { showBeforeStarting } from "./atom";

function Lecturelist() {
  const [BeforeStarting, BeforeStartingModalSetState] =
    useAtom(showBeforeStarting);
  const [SPushData, setSPushData] = useState(null);

  const data = [
    { name: "講義A", date: "7/12", lectureId: "1" },
    { name: "講義B", date: "7/13", lectureId: "2" },
    { name: "講義C", date: "7/14", lectureId: "3" },
  ];

  function handleBeforeStartingModal(ele) {
    console.log(ele);
    setSPushData(ele);
    console.log("click");
    BeforeStartingModalSetState(true);
  }

  return (
    <>
      <div className="sikaku">
        {data.map((ele) => {
          return (
            <div>
              <div
                className="left"
                onClick={() => handleBeforeStartingModal(ele)}
              >
                {ele.name}
              </div>
              <div className="left">{ele.date} </div>
              <div>{ele.lectureId} </div>
            </div>
          );
        })}
      </div>
      {BeforeStarting && (
        <BeforeStartingModal
          BeforeStartingModalSetState={BeforeStartingModalSetState}
          SPushData={SPushData}
        />
      )}
    </>
  );
}

export default Lecturelist;
