import { useState } from "react";
import Lecturelist from "./Lecturelist";
import EndLecturelist from "./EndLecturelist";
import SettingModal from "./modal/SettingModal";
import CreateLectureModal from "./modal/CreateLectureModal";
import qtaImage from "/public/Signal.png";
import { useAtom } from "jotai";
import { showSettingM, showCreateLectureM } from "./atom";

import Recording from "../Recording";

function Dashboard() {
  const [SettingM, SettingModalSetState] = useAtom(showSettingM);
  const [CreateLectureM, CreateLectureModalSetState] =
    useAtom(showCreateLectureM);

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
        <Recording />
        <button>🔔</button>
        <button>⚙️</button>
        <button onClick={handleSettingModal}>🙍‍♂️</button>
        {SettingM && (
          <SettingModal
            SettingModalSetState={SettingModalSetState}
            SettingM={SettingM}
          />
        )}
        <div>
          <h1 className="left">講義ダッシュボード</h1>{" "}
          <img id="qta" src={qtaImage} alt="qta" />
        </div>
        <button onClick={handleCreateLectureModal}>講義の新規登録</button>
        {CreateLectureM && (
          <CreateLectureModal
            CreateLectureModalSetState={CreateLectureModalSetState}
            CreateLectureM={CreateLectureM}
          />
        )}
        <div className="yoko">
          <div className="left">
            <h2>講義リスト(予定)</h2>
            <Lecturelist />
          </div>
          <div className="left">
            <h2>実装済講義リスト</h2>
            <EndLecturelist />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
