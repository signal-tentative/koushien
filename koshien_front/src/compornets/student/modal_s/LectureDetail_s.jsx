import { useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import {
  showCreateLecture,
  showLectureDetail,
  showSettingModal,
} from "../atom";
import FileSelectURL_s from "../../instructer/FileSelectURL";
import "./modal.css";
function LectureDetail_s() {
  const navigate = useNavigate();
  const [lectureImplementation, setLectureImplementation] = useState("");
  const [isShowCreateLectureModal_S, setIsShowCreateLectureModla_S] =
    useAtom(showCreateLecture);
  const [isShowSettingModal_S, setIsShowSettingModal_S] =
    useAtom(showLectureDetail);
  const [isShowLectureDetailModal_S, setIsShowLectureDetailModal_S] =
    useAtom(showSettingModal);
  const handleRectureParticipation = () => {
    const judge = window.confirm("講義に参加しますか？");
    if (!judge) return;
  };

  const handleCloseLectureDetailModal_S = () => {
    console.log(isShowLectureDetailModal_S);
    setIsShowLectureDetailModal_S(!isShowLectureDetailModal_S);
  };

  const handleImplementation = (e) => {
    setLectureImplementation(e.target.value);
  };

  return (
    <div className="lecture_detail_card ">
      <div onClick={handleCloseLectureDetailModal_S}>❌</div>
      <FileSelectURL_s />
      <div className="lecture_detail_header">
        <h1>講義タイトル</h1>
      </div>
      <div className="lecture_detail_container">
        <div className="lecture_detail_koumoku">講師名</div>
        <div className="lecture_detail_syousai">太郎</div>
        <h5>講義ID</h5>
        <div>
          実施予定日付
          <input type="date" onChange={handleImplementation} />
        </div>
        <div>
          講義概要：
          <textarea />
        </div>
      </div>
      <div className="lecture_detail_syousai">
        <h5>サンプル</h5>
      </div>
      <div>
        <a href="ここにteamsLink" />
        <button>講義参加ボタン</button>
      </div>
    </div>
  );
}

export default LectureDetail_s;
