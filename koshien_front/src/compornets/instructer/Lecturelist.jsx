import { useState } from "react";
import BeforeStartingModal from "./modal/BeforeStartingModal";
import { useAtom } from "jotai";
import { showBeforeStarting } from "./atom";

function Lecturelist() {
  const [BeforeStarting, BeforeStartingModalSetState] =
    useAtom(showBeforeStarting);
  const [SPushData, setSPushData] = useState(null);

  const data = [
    {
      name: "講師 太郎",
      title: "マルチパスウェイ戦略入門",
      text: "トヨタのマルチパスウェイ戦略の基礎概念と実践的な取り組みについて学びます。",
      date: "2026-07-10",
      duration: "60",
      lectureId: "1",
    },
    {
      name: "講師 太郎",
      title: "シングルパスウェイ戦略入門",
      text: "トヨタのシングルパスウェイ戦略の基礎概念と実践的な取り組みについて学びます。",
      date: "2026-07-10",
      duration: "120",
      lectureId: "2",
    },
    {
      name: "講師 太郎",
      title: "トリプルパスウェイ戦略入門",
      text: "トヨタのトリプルパスウェイ戦略の基礎概念と実践的な取り組みについて学びます。",
      date: "2026-07-10",
      duration: "90",
      lectureId: "3",
    },
  ];

  function handleBeforeStartingModal(ele) {
    console.log(ele);
    setSPushData(ele);
    console.log("click");
    BeforeStartingModalSetState(true);
  }

  return (
    <>
      <div className="tatewaku">
        {data.map((ele) => {
          return (
            <div className="autoBoard">
              <div className="haji">
                <div>
                  <div className="beforetag">実施前</div>
                  <div className="title">{ele.title} </div>
                  <div className="gaiyo">{ele.text} </div>
                  <div className="elseInfo">
                    <div>🗓️{ele.date} </div>
                    <div>🕓{ele.duration}分 </div>
                    <div>👤{ele.name} </div>
                  </div>
                </div>
                <button
                  className="blueStartBtn"
                  onClick={() => handleBeforeStartingModal(ele)}
                >
                  ▷開始
                </button>
              </div>
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
