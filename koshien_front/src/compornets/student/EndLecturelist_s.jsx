import Matome_s from "./Matome_s";
import { useState } from "react";
import { useAtom } from "jotai";
import AfterLectureDetail_s from "./modal_s/AfterLectureDetail_s";
import {
  showCreateLecture,
  showLectureDetail,
  showSettingModal,
  showAfterLectureDetail,
} from "./atom";
function EndLecturelist_s() {
  const [MatomeM, MatomeModalSetState] = useState(false);
  const [PushData, setPushData] = useState(null);
  const [isShowCreateLectureModal_S, setIsShowCreateLectureModla_S] =
    useAtom(showCreateLecture);
  const [isShowSettingModal_S, setIsShowSettingModal_S] =
    useAtom(showLectureDetail);
  const [isShowLectureDetailModal_S, setIsShowLectureDetailModal_S] =
    useAtom(showSettingModal);
  const [isShowAfterLectureDetailModal_S, setIsShowAfterLectureDetail_S] =
    useAtom(showAfterLectureDetail);

  const data = [
    { name: "講義D", date: "6/12", lectureId: "4" },
    { name: "講義E", date: "6/13", lectureId: "5" },
    { name: "講義F", date: "6/14", lectureId: "6" },
  ];

  const handleOpenAfterLectureModal_s = () => {
    setIsShowAfterLectureDetail_S(!isShowAfterLectureDetailModal_S);
  };

  function handleMatome(ele) {
    setPushData(ele);
    console.log("PushData", PushData); //eleをとってその情報のまとめを表示できるようにしたい
    console.log("click");
    MatomeModalSetState(true);
  }

  return (
    <>
      <list>
        {data.map((ele) => {
          return (
            <>
              <div>
                <button onClick={handleOpenAfterLectureModal_s}>
                  {ele.name}
                </button>
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
            MatomeM={MatomeM}
            PushData={PushData}
          />
        )}
      </list>
    </>
  );
}

export default EndLecturelist_s;
