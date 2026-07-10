import { useAtom } from "jotai";
import { atomSettingModal } from "../atoms";
import { useState } from "react";
import "./modal.css";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Q_taRun from "/public/Q_taRun.png";

function SettingModal({ handleClose }) {
  const [addjotai, setaddjotai] = useState("default"); //
  const [serchjotai, setserchjotai] = useState(false); //
  const [data, setData] = useState(null); //

  const [certLectureCode, setLectureCode] = useState("");

  function handleCloseBtn() {
    handleClose();
  }

  function handleAdd() {
    if (!certLectureCode) {
      setaddjotai("empty");
      console.log("codeがからです");
      return;
    }
    setaddjotai("ok");
    //post
    console.log("create");
  }
  function handleSerch() {
    if (!certLectureCode) {
      //インプットがからなら
      setaddjotai("error");
      console.log("codeがからです");
      return;
    }
    const get = async () => {
      try {
        const response = await fetch("/api/users");
        const json = await response.json();
        setData(json);
      } catch {
        console.error("error");
      }
    };
    get();

    if ("jotaitoka" == "notfind") {
      //見つからなかったら
      setaddjotai("error");
      console.log("見つかりませんでした");
      return;
    }
    setaddjotai("active");
    setserchjotai(true);
    console.log("create");
  }

  return (
    <>
      {serchjotai && addjotai == "ok" ? (
        <div className="board Created">
          <div>
            <img id="Q_taRun" src={Q_taRun} alt="image" />
            <div id="AddTitle">講義を追加しました!</div>
            <div style={{ fontSize: "16px", paddingBottom: "30px" }}>
              講義名:XXXXXXXX
            </div>
            <button className="saveBtn" onClick={handleClose}>
              メイン画面に戻る
            </button>
          </div>
        </div>
      ) : (
        <div className="board AddLectureModal">
          <div id="AddTitleHeader">
            <div id="AddTitle">講義を追加</div>
          </div>
          <div id="borderline"></div>
          {addjotai == "default" || addjotai == "active" ? (
            <div id="SerchContainer">
              <p style={{ fontSize: "16px", marginLeft: "-30px" }}>
                受け取ったコードを入力してください
              </p>
              <div id="batten" onClick={handleCloseBtn}>
                ×
              </div>
              <div className="inputTitle">講義コード</div>
              <div id="inputAndSerch">
                <input
                  className="serchinputBox"
                  type="text"
                  placeholder="例：TYT-001"
                  onChange={(e) => setLectureCode(e.target.value)}
                />
                <button id="SerchBtn" onClick={handleSerch}>
                  検索
                </button>
              </div>
            </div>
          ) : (
            <div id="SerchContainer">
              <div id="batten2" onClick={handleCloseBtn}>
                ×
              </div>
              <p
                style={{
                  fontSize: "16px",
                  marginLeft: "-30px",
                  marginTop: "-32px",
                  paddingBottom: "32px",
                }}
              >
                受け取ったコードを入力してください
              </p>
              <div className="inputTitle">講義コード</div>
              <div id="inputAndSerch">
                <input
                  className="sercherrorinputBox"
                  type="text"
                  placeholder="例：TYT-001"
                  onChange={(e) => setLectureCode(e.target.value)}
                />
                <button id="SerchBtn" onClick={handleSerch}>
                  検索
                </button>
              </div>
            </div>
          )}
          <div id="borderline"></div>
          {addjotai == "default" ? (
            <div>
              <button className="NoaddBtn" style={{ color: "#c1b9a0" }}>
                追加する
              </button>
            </div>
          ) : addjotai == "active" ? (
            <button className="saveBtn" onClick={handleAdd}>
              追加する
            </button>
          ) : (
            <div className="errorloginBox">
              <button className="saveBtn" onClick={handleAdd}>
                追加する
              </button>
              <div className="redText" style={{ fontWeight: 300 }}>
                講義が見つかりません。講義コードを再確認してください。
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default SettingModal;
