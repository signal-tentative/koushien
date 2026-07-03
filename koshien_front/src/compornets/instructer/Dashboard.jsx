import { useState } from "react";
import Lecturelist from "./Lecturelist";
import EndLecturelist from "./EndLecturelist";
import SettingModal from "./modal/SettingModal";
import CreateLectureModal from "./modal/CreateLectureModal";

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
      <div className="dashbord">
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
        <div className="greeting">
          <h1>こんにちは、田中さん👋</h1>
          <h2>今日も素晴らしい講義を！受講生が待っています。</h2>
        </div>

        {CreateLectureM && (
          <CreateLectureModal
            CreateLectureModalSetState={CreateLectureModalSetState}
            CreateLectureM={CreateLectureM}
          />
        )}
        <div className="yoko">
          <div className="left">
            <h2>
              実施前
              <div className="count">3</div>
              <button id="orangeBtn" onClick={handleCreateLectureModal}>
                + 講義の新規登録
              </button>
            </h2>
            <Lecturelist />
          </div>
          <div className="left">
            <h2>
              実施済み
              <div className="count">3</div>
            </h2>
            <EndLecturelist />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
