import { useState } from "react";
import Lecturelist from "./Lecturelist";
import EndLecturelist from "./EndLecturelist";
import { useNavigate } from "react-router";
import CreateLecture from "./CreateLecture";
import SettingStudent from "./SettingStudent";
import LectureDetail from "./LectureDetail";
import { useAtom } from "jotai";
import { showCreateLecture, showLectureDetail, showSettingModal } from "./atom";

function Dashboard() {
  const navigate = useNavigate();

  const [isShowCreateLectureModal_S, setIsShowCreateLectureModla_S] =
    useAtom(showCreateLecture);
  const [isShowSettingModal_S, setIsShowSettingModal_S] =
    useAtom(showLectureDetail);
  const [isShowLectureDetailModal_S, setIsShowLectureDetailModal_S] =
    useAtom(showSettingModal);

  const handleOpenCreateLectureModal_S = () => {
    setIsShowCreateLectureModla_S(!isShowCreateLectureModal_S);
  };
  const handleOpenSettingModal_S = () => {
    setIsShowSettingModal_S(!isShowSettingModal_S);
  };
  console.log(isShowCreateLectureModal_S);
  return (
    <>
      <div>
        <button>🔔通知設定</button>
        <button>⚙️</button>
        <button
          onClick={handleOpenSettingModal_S}
          hidden={isShowSettingModal_S === true}
        >
          🙍‍♂️受講生側ユーザー設定表示
        </button>
        <h1>講義ダッシュボード</h1>
        <button
          onClick={handleOpenCreateLectureModal_S}
          hidden={isShowCreateLectureModal_S === true}
        >
          講義の新規登録
        </button>
        {isShowCreateLectureModal_S && <CreateLecture />}
        {isShowSettingModal_S && <SettingStudent />}
        {isShowLectureDetailModal_S && <LectureDetail />}
        {isShowCreateLectureModal_S === false &&
          isShowSettingModal_S === false &&
          isShowLectureDetailModal_S === false && (
            <div>
              <div>
                <h2>講義リスト(予定)</h2>
                <Lecturelist />
              </div>
              <div>
                <h2>実装済講義リスト</h2>
                <EndLecturelist />
              </div>
            </div>
          )}
      </div>
    </>
  );
}

export default Dashboard;
