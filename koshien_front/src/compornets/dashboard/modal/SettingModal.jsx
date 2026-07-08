import { useAtom } from "jotai";
import { atomSettingModal } from "../atoms";
import { useState } from "react";
import "./modal.css";

function SettingModal({ handleClose }) {
  const [emailjotai, setemailjotai] = useState("default");
  // const [pwjotai, setpwjotai] = useState("default");
  const [loginjotai, setloginjotai] = useState("default");
  const [certEmail, setCertEmail] = useState("");
  const [certName, setCertName] = useState("佐藤健太"); //元の名前を入れておくべき
  // const [beforeEmailPw, setbeforeEmailPw] = useState("");

  // if (loginjotai == "default") {
  //   if (certId && certPw) {
  //     setloginjotai("ready");
  //   }
  // }

  // if (loginjotai == "ready") {
  //   if (!certId || !certPw) {
  //     setloginjotai("default");
  //   }
  // }
  // if (loginjotai == "error") {
  //   console.log(beforeEmailPw);
  //   if (certId + certPw !== beforeEmailPw) {
  //     setloginjotai("ready");
  //   }
  // }
  function handleCloseBtn() {
    handleClose();
  }
  function handleSave() {
    if (!certName || !certEmail) {
      setemailjotai("error");
      setloginjotai("error");
      return;
    }
    //post
    console.log("save");
  }

  return (
    <>
      <div className="board settingModal">
        <div className="">
          <p>アカウント設定</p>
          <p onClick={handleCloseBtn}>🙅</p>
        </div>
        {emailjotai == "default" ? (
          <div className="inputAdress">
            <div className="inputTitle">メールアドレス</div>
            <input
              className="inputBox"
              type="text"
              placeholder="example@toyota.co.jp"
              onChange={(e) => setCertEmail(e.target.value)}
            />
          </div>
        ) : (
          <div className="inputContener">
            <div className="inputTitle" style={{ color: "red" }}>
              メールアドレス
            </div>
            <input
              className="errorinput"
              type="text"
              placeholder="example@toyota.co.jp"
              onChange={(e) => setCertEmail(e.target.value)}
            />
          </div>
        )}

        <div>
          <div className="inputTitle">表示名</div>
          <input
            value={certName}
            className="inputBox"
            type="text"
            placeholder="佐藤 健太"
            onChange={(e) => setCertName(e.target.value)}
          />
        </div>

        {loginjotai == "default" ? (
          <div>
            <button className="saveBtn" onClick={handleSave}>
              変更を保存
            </button>
          </div>
        ) : (
          <div className="errorloginBox">
            <button className="saveBtn" onClick={handleSave}>
              変更を保存
            </button>
            <div className="redText" style={{ fontWeight: 300 }}>
              未入力項目があります。確認してください。
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default SettingModal;
