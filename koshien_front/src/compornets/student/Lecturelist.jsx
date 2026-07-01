import { useState } from "react";
import { useAtom } from "jotai";
import { showCreateLecture, showLectureDetail, showSettingModal } from "./atom";
function Lecturelist() {
  const [count, setCount] = useState(0);
  const [isShowCreateLectureModal_S, setIsShowCreateLectureModla_S] =
    useAtom(showCreateLecture);
  const [isShowSettingModal_S, setIsShowSettingModal_S] =
    useAtom(showLectureDetail);
  const [isShowLectureDetailModal_S, setIsShowLectureDetailModal_S] =
    useAtom(showSettingModal);

  const data = [{ name: "講義A" }, { name: "講義B" }, { name: "講義C" }];
  const handleOpenLectureDetailModal_S = () => {
    setIsShowLectureDetailModal_S(!isShowLectureDetailModal_S);
  };
  return (
    <>
      <list>
        {data.map((ele) => {
          return <div onClick={handleOpenLectureDetailModal_S}>{ele.name}</div>;
        })}
      </list>
    </>
  );
}

export default Lecturelist;
