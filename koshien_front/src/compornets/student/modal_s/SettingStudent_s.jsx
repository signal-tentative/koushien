import { useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import {
  showCreateLecture,
  showLectureDetail,
  showSettingModal,
} from "../atom";
function SettingStudent_s() {
  const navigate = useNavigate();
  const [isShowCreateLectureModal_S, setIsShowCreateLectureModla_S] =
    useAtom(showCreateLecture);
  const [isShowSettingModal_S, setIsShowSettingModal_S] =
    useAtom(showLectureDetail);
  const [isShowLectureDetailModal_S, setIsShowLectureDetailModal_S] =
    useAtom(showSettingModal);
  const handleSettingResistration = () => {
    const judge = window.confirm("この内容で間違いないですか？");
    if (!judge) return;
  };
  const handleCloseSettingModal_S = () => {
    setIsShowSettingModal_S(!isShowSettingModal_S);
  };

  return (
    <div className="create_lecture-card">
      <div onClick={handleCloseSettingModal_S}>❌</div>
      <div>
        <h1>ユーザー設定変更</h1>
        <h5>設定項目</h5>
        <div>
          email:
          <input type="text" />
        </div>
        <div>
          name:
          <input type="text" />
        </div>
        <div>
          講師ON:
          <input type="checkbox" />
        </div>
        <div>
          <button onClick={handleSettingResistration}>登録</button>
        </div>
      </div>
    </div>
  );
}

export default SettingStudent_s;
