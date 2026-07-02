import { useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { showCreateLecture, showLectureDetail, showSettingModal } from "./atom";
function CreateLecture() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [isShowCreateLectureModal_S, setIsShowCreateLectureModla_S] =
    useAtom(showCreateLecture);
  const [isShowSettingModal_S, setIsShowSettingModal_S] =
    useAtom(showLectureDetail);
  const [isShowLectureDetailModal_S, setIsShowLectureDetailModal_S] =
    useAtom(showSettingModal);
  const handleResistration = () => {
    const judge = window.confirm("この講義で間違いないですか？");
    if (!judge) return;
  };
  const handleCloseCreateLectureModal_S = () => {
    setIsShowCreateLectureModla_S(!isShowCreateLectureModal_S);
  };

  return (
    <div className="create_lecture-card">
      <div onClick={handleCloseCreateLectureModal_S}>❌</div>
      <div>
        <h1>講義登録</h1>
        <h5>講義IDを登録し、講義を追加します。</h5>
        <div>
          講義ID
          <input type="text" />
        </div>
        <div>
          <button onClick={handleResistration}>登録</button>
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
