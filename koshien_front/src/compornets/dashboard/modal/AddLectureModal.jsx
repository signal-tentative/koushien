import { useAtom } from "jotai";
import { atomSettingModal } from "../atoms";
import { use, useState, useEffect } from "react";
import "./modal.css";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Q_taRun from "/public/Q_taRun.png";

function AddLectureModal({ handleClose }) {
  const [addjotai, setaddjotai] = useState("default"); //
  const [serchjotai, setserchjotai] = useState(false); //
  const [data, setData] = useState(null); //
  const uid = localStorage.getItem("user_uid");

  const [certLectureCode, setLectureCode] = useState("");
  const [discribeLec, setDiscribeLec] = useState("");
  const [lecResult, setLecResult] = useState("");
  const [lecId, setLecId] = useState("");
  const [afterLec, setAfterLec] = useState([]);
  const [title, setTitle] = useState("");
  let date;
  let startTime;
  let endTime;

  function handleCloseBtn() {
    handleClose();
  }

  async function handleAdd() {
    if (!certLectureCode) {
      setaddjotai("empty");
      console.log("codeがからです");
      return;
    }
    if (!serchjotai) {
      console.log("見つかってないよ");
      return;
    }
    setaddjotai("ok");
    const formData = new FormData();
    const lecCode = formData.append("user_uid", uid);
    const lecNum = Number(lecId);
    console.log(lecNum);
    formData.append("lecture_id", lecNum);
    const result = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
      method: "POST",
      body: formData,
    });
    //post
    console.log("create");
  }
  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/students/uid/${uid}`)
      .then((response) => response.json())
      .then((jsonData) => {
        return Promise.all(
          jsonData.map((firstData) =>
            fetch(
              `${import.meta.env.VITE_API_URL}/lectures/${firstData.lecture.id}`,
            ).then((response) => response.json()),
          ),
        );
      })
      .then((setData) => {
        setAfterLec(setData);
      });
  }, []);

  console.log(afterLec);
  async function handleSerch() {
    if (!certLectureCode) {
      //インプットがからなら
      setaddjotai("error");
      console.log("codeがからです");
      return;
    } else {
      console.log(typeof certLectureCode);
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/lectures/code/${certLectureCode}`,
      );
      console.log(result);
      const text = await result.text();
      if (text !== "") {
        console.log("oioi");
        const jsonData = await JSON.parse(text);
        console.log(jsonData);
        if (jsonData.execute === true) {
          setaddjotai("error");
          setserchjotai(false);
          console.log("もう実施しました");
          return;
        } else if (afterLec.some((data) => data.id === jsonData.id)) {
          setaddjotai("error");
          setserchjotai(false);
          console.log("もう追加しています");
          return;
        }

        setTitle(jsonData.title);

        //日付

        const datePart = jsonData.startDate.split("T")[0];

        const parts = datePart.split("-");

        date = `${parts[1]}/${parts[2]}`;

        //開始時刻
        const startTimes = jsonData.startDate.split("T")[1];

        const startparts = startTimes.split(":");

        startTime = `${startparts[0]}:${startparts[1]}`;

        //終了時刻
        const timePart = jsonData.endDate.split("T")[1];

        const endparts = timePart.split(":");

        endTime = `${endparts[0]}:${endparts[1]}`;
        setaddjotai("active");
        setserchjotai(true);
        console.log(jsonData.id);
        setLecId(jsonData.id);
        setLecResult(
          <div>
            <p>{jsonData.title}</p>
            <p>日時 {date}</p>
            <p>開始時刻 {startTime}</p>
            <p>終了時刻 {endTime}</p>
          </div>,
        );
      } else {
        setaddjotai("error");
        setserchjotai(false);
        console.log("もう実施しました");
        return;
      }
    }
  }

  return (
    <>
      {serchjotai && addjotai == "ok" ? (
        <div className="board Created">
          <div>
            <img id="Q_taRun" src={Q_taRun} alt="image" />
            <div id="AddTitle">講義を追加しました!</div>
            <div style={{ fontSize: "16px", paddingBottom: "30px" }}>
              講義名:{title}
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
            <div>
              <div id="result">
                <div>{lecResult}</div>
              </div>
              <button className="saveBtn" onClick={handleAdd}>
                追加する
              </button>
            </div>
          ) : (
            <div className="errorloginBox">
              <button className="saveBtn" onClick={handleAdd}>
                追加する
              </button>
              <div className="redText" style={{ fontWeight: 300 }}>
                追加可能な講義が見つかりません。<br></br>
                講義コードを再確認してください。
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default AddLectureModal;
