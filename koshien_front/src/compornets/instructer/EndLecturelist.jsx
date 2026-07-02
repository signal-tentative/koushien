import Matome from "./modal/MatomeModal";
import { useState } from "react";
import { useAtom } from "jotai";
import { showMatomeM } from "./atom";

function EndLecturelist() {
  const [MatomeM, MatomeModalSetState] = useAtom(showMatomeM);
  const [PushData, setPushData] = useState(null);

  const data = [
    { name: "講義D", date: "6/12", lectureId: "4" },
    { name: "講義E", date: "6/13", lectureId: "5" },
    { name: "講義F", date: "6/14", lectureId: "6" },
  ];

  function handleMatome(ele) {
    setPushData(ele);
    // console.log("eleData", PushData); //eleをとってその情報のまとめを表示できるようにしたい
    MatomeModalSetState(true);
  }

  return (
    <>
      <list>
        {data.map((ele) => {
          return (
            <>
              <div>
                {ele.name}
                {ele.date}
                {ele.lectureId}
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
      </list>
    </>
  );
}

export default EndLecturelist;
