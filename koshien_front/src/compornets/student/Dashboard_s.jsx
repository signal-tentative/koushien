import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import {
  showCreateLecture,
  showLectureDetail,
  showSettingModal,
  showAfterLectureDetail,
} from "./atom";
import Lecturelist_s from "./Lecturelist_s";
import EndLecturelist_s from "./EndLecturelist_s";
import CreateLecture_s from "./modal_s/CreateLecture_s";
import SettingStudent_s from "./modal_s/SettingStudent_s";
import LectureDetail_s from "./modal_s/LectureDetail_s";
import AfterLectureDetail_s from "./modal_s/AfterLectureDetail_s";

function Dashboard_s() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [isShowCreateLectureModal_S, setIsShowCreateLectureModla_S] =
    useAtom(showCreateLecture);
  const [isShowSettingModal_S, setIsShowSettingModal_S] =
    useAtom(showLectureDetail);
  const [isShowLectureDetailModal_S, setIsShowLectureDetailModal_S] =
    useAtom(showSettingModal);
  const [isShowAfterLectureDetailModal_S, setIsShowAfterLectureDetail_S] =
    useAtom(showAfterLectureDetail);

  const handleOpenCreateLectureModal_S = () => {
    setIsShowCreateLectureModla_S(!isShowCreateLectureModal_S);
  };
  const handleOpenSettingModal_S = () => {
    setIsShowSettingModal_S(!isShowSettingModal_S);
  };
  console.log(isShowCreateLectureModal_S);

  useEffect(() => {
    console.log("テスト");
    const res = fetch("http://localhost:8080/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答が正しくありません");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("データ取得エラー:", error);
      });
  }, []);
  console.log(users);

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
        {isShowCreateLectureModal_S && <CreateLecture_s />}
        {isShowSettingModal_S && <SettingStudent_s />}
        {isShowLectureDetailModal_S && <LectureDetail_s />}
        {isShowAfterLectureDetailModal_S && <AfterLectureDetail_s />}
        {isShowCreateLectureModal_S === false &&
          isShowSettingModal_S === false &&
          isShowLectureDetailModal_S === false &&
          isShowAfterLectureDetailModal_S === false && (
            <div>
              <div>
                <h2>講義リスト(予定)</h2>
                <Lecturelist_s />
              </div>
              <div>
                <h2>実装済講義リスト</h2>
                <EndLecturelist_s />
              </div>
            </div>
          )}
      </div>
    </>
  );
}

export default Dashboard_s;
