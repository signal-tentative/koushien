import { useState } from "react";
import Lecturelist from "./Lecturelist";
import EndLecturelist from "./EndLecturelist";
import SettingModal from "./SettingModal";
import CreateLectureModal from "./CreateLectureModal";

function Dashboard() {
  const [count, setCount] = useState(0);
  const [SettingM, SettingModalSetState] = useState(false);
  const [CreateLectureM, CreateLectureModalSetState] = useState(false);

  const handleCreateLectureModal = () => {
    console.log("hanle");
    CreateLectureModalSetState(true);
  };

  const handleSettingModal = () => {
    console.log("handle");
    SettingModalSetState(true);
  };
  return (
    <>
      <div>
        <button>🔔</button>
        <button>⚙️</button>
        <button onClick={handleSettingModal}>🙍‍♂️</button>
        {SettingM && (
          <SettingModal
            SettingModalSetState={SettingModalSetState}
            SettingM={SettingM}
          />
        )}
        <h1>講義ダッシュボード</h1>
        <button onClick={handleCreateLectureModal}>講義の新規登録</button>
        {CreateLectureM && (
          <CreateLectureModal
            CreateLectureModalSetState={CreateLectureModalSetState}
            CreateLectureM={CreateLectureM}
          />
        )}
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
      </div>
    </>
  );
}

export default Dashboard;
