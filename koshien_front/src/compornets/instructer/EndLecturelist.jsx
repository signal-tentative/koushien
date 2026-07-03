import Matome from "./modal/MatomeModal";
import { useState } from "react";
import { useAtom } from "jotai";
import { showMatomeM } from "./atom";

function EndLecturelist() {
  const [MatomeM, MatomeModalSetState] = useAtom(showMatomeM);
  const [PushData, setPushData] = useState(null);

  const data = [
    {
      name: "講師 太郎",
      title: "AWS入門",
      text: "AWSの基礎概念と実践的な取り組みについて学びます。",
      date: "2026-07-10",
      lectureId: "1",
      duration: "60",
    },
    {
      name: "講師 太郎",
      title: "AWS中門",
      text: "AWSの基礎概念と実践的な取り組みについて学びます。",
      date: "2026-07-14",
      lectureId: "2",
      duration: "60",
    },
    {
      name: "講師 太郎",
      title: "AWS難門",
      text: "AWSの基礎概念と実践的な取り組みについて学びます。",
      date: "2026-07-19",
      lectureId: "3",
      duration: "60",
    },
  ];

  function handleMatome(ele) {
    setPushData(ele);
    // console.log("eleData", PushData); //eleをとってその情報のまとめを表示できるようにしたい
    MatomeModalSetState(true);
  }

  return (
    <>
      <div className="tatewaku">
        {data.map((ele) => {
          return (
            <>
              <div className="autoBoard">
                <div className="column">
                  <div className="aftertag">実施済み</div>
                  <div className="whatcount">❓ {12}件のわからない</div>
                </div>
                <div className="title">{ele.title}</div>
                <div className="elseInfo">
                  <div>🗓️{ele.date} </div>
                  <div>🕓{ele.duration}分 </div>
                  <div>👤{ele.name} </div>
                </div>
                <button id={ele.name} onClick={() => handleMatome(ele)}>
                  まとめ
                </button>
              </div>
            </>
          );
        })}
        {MatomeM && (
          <Matome
            MatomeModalSetState={MatomeModalSetState}
            PushData={PushData}
          />
        )}
      </div>
    </>
  );
}

export default EndLecturelist;
