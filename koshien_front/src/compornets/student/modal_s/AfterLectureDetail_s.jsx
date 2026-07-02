import { useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import {
  showAfterLectureDetail,
  showCreateLecture,
  showLectureDetail,
  showSettingModal,
} from "../atom";

function AfterLectureDetail_s() {
  const navigate = useNavigate();
  const [lectureImplementation, setLectureImplementation] = useState("");
  const [isShowCreateLectureModal_S, setIsShowCreateLectureModla_S] =
    useAtom(showCreateLecture);
  const [isShowSettingModal_S, setIsShowSettingModal_S] =
    useAtom(showLectureDetail);
  const [isShowLectureDetailModal_S, setIsShowLectureDetailModal_S] =
    useAtom(showSettingModal);
  const [isShowAfterLectureDetailModal_S, setIsShowAfterLectureDetail_S] =
    useAtom(showAfterLectureDetail);

  const handleRectureParticipation = () => {
    const judge = window.confirm("講義に参加しますか？");
    if (!judge) return;
  };

  const handleCloseAfterLectureDetailModal_S = () => {
    setIsShowAfterLectureDetail_S(!isShowAfterLectureDetailModal_S);
  };

  const handleImplementation = (e) => {
    setLectureImplementation(e.target.value);
  };

  const handleToAIques_s = () => {
    navigate("/aiques_s");
  };

  return (
    <div className="create_lecture-card">
      <div onClick={handleCloseAfterLectureDetailModal_S}>❌</div>
      <div>
        <button onClick={handleToAIques_s}>AI質疑応答</button>
      </div>
      <div>
        <h1>講義タイトル</h1>
        <h5>講師名</h5>
        <div>
          開催日時
          {"20261212"}
        </div>
        <div>
          講義概要：
          <textarea />
        </div>
        <div>講師コメントエリア</div>
        <div>質疑応答エリア</div>
      </div>
    </div>
  );
}

export default AfterLectureDetail_s;
