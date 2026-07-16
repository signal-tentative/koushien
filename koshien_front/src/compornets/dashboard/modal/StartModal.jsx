import { useAtom } from "jotai";
import { atomSettingModal } from "../atoms";
import { useEffect, useState } from "react";
import "./modal.css";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ScriptList from "../list/ScriptList";
import Button from "@mui/material/Button";
import { href, useNavigate } from "react-router";
import { useLocation } from "react-router";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { blue } from "@mui/material/colors";

function StartModal({ handleClose, SelectLecture }) {
  const [titlejotai, settitlejotai] = useState("default");
  const [explanationjotai, setexplanationjotai] = useState("default");
  const [uploadjotai, setuploadjotai] = useState("default");
  const [DeleteScreen, setDeleteScreen] = useState(false);
  const [CopyState, setCopyScreen] = useState(false);
  const [url, setUrl] = useState("");
  const [docId, setDocId] = useState("");

  const [certTitle, setCertTitle] = useState("");
  const [certExplanation, setCertExplanation] = useState(""); //元の名前を入れておくべき
  const navigate = useNavigate();
  const [copyState, setCopyState] = useState(false); //3秒だけ表示される「コピーされました」の表示
  async function handleCopyBtn() {
    await navigator.clipboard.writeText(data.code);
    console.log("コピー完了");
    setCopyState(true);
    setTimeout(() => {
      setCopyState(false);
      console.log("コピー完了の表示を消しました");
    }, 3000);
  } //return内,falseはなくていい
  {
    copyState ? <div>「コピーされました」true</div> : <div>false</div>;
  }

  function handleCloseBtn() {
    handleClose();
  }
  function handleEditBtn() {
    console.log("edit");
  }
  function handleDeleteIconBtn() {
    setDeleteScreen(true);
  }
  function handleDeleteBtn() {
    console.log("delete");
  }
  function handleDeleteCloseBtn() {
    setDeleteScreen(false);
  }

  function handleStart() {
    // if (!certTitle || !certExplanation) {
    //   if (!certTitle) {
    //     settitlejotai("error");
    //   }
    //   if (!certExplanation) {
    //     setexplanationjotai("error");
    //   }
    //   setuploadjotai("error");
    //   return;
    // }
    window.open(
      `http://ec2-52-45-28-109.compute-1.amazonaws.com:5173/slide`,
      "_blank",
    );
    navigate("/live", { state: { lecture_id: lecId } });
    //post
    console.log("create");
  }

  const data = SelectLecture;
  // useEffect(() => {
  //   return Promise.all(
  //     fetch(`${import.meta.env.VITE_API_URL}/lectures/code/${data.id}`).then(
  //       (resData) => {
  //         const json = resData.json();
  //         console.log(json);
  //       },
  //     ),
  //   ).then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/documents/${data.id}`).then(
        (resData) => {
          return resData.json();
        },
      ),
    ])
      .then((results) => {
        const jsonData = results[0];
        console.log("Promise.all での取得成功:", jsonData);
        setUrl(jsonData.link);
        setDocId(jsonData.id);
      })
      .catch((error) => {
        console.error("通信エラー:", error);
      });
  }, [data.id]);

  //レクチャーid
  const lecId = data.id;
  console.log(lecId);

  //講義タイトル
  const title = data.title;
  //講義コード
  const code = data.code;
  //説明
  const description = data.description;
  //開始時刻
  const startTimes = data.startDate.split("T")[1];

  const startparts = startTimes.split(":");

  const startTime = `${startparts[0]}:${startparts[1]}`;

  //終了時刻
  const timePart = data.endDate.split("T")[1];

  const endparts = timePart.split(":");

  const endTime = `${endparts[0]}:${endparts[1]}`;

  //年
  const year = data.startDate.slice(0, 4);
  //月
  let month;
  if (data.startDate[5] == "0") {
    month = data.startDate[6];
  } else {
    month = data.startDate[5] + data.startDate[6];
  }
  //日
  const day = data.startDate[8] + data.startDate[9];

  return (
    <>
      <div className="board StartModal">
        <div>
          <div className="JoinTitle">
            <p>講義名:{title}</p>

            <EditIcon
              style={{
                paddingLeft: "10%",
                paddingRight: "10%",
                color: "#006693",
                cursor: "pointer",
              }}
              onClick={handleEditBtn}
            />
            {DeleteScreen ? (
              <div id="deleteFrame">
                <DeleteIcon
                  style={{ color: "#006693", cursor: "pointer" }}
                  onClick={handleDeleteIconBtn}
                />
                <div className="board deleteScreen">
                  <p id="deleteText">講義を削除します。よろしいですか？</p>
                  <div id="deleteScreenBtn">
                    <button
                      id="grayNotDeleteBtn"
                      onClick={handleDeleteCloseBtn}
                    >
                      削除しない
                    </button>
                    <button id="redDeleteBtn" onClick={handleDeleteBtn}>
                      削除する
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div id="deleteFrame">
                <DeleteIcon
                  style={{ color: "#006693", cursor: "pointer" }}
                  onClick={handleDeleteIconBtn}
                />
              </div>
            )}

            <p
              id="StartBatten"
              style={{ cursor: "pointer" }}
              onClick={handleCloseBtn}
            >
              ×
            </p>
          </div>
        </div>

        <div id="borderline"></div>

        <div className="StartmodalFrame">
          <div className="InfoAndCode">
            <div id="between-left">
              <div id="between-left-left">
                <p className="SMTitle"> 講義情報</p>
                <p className="SMtext">講師</p>
                <p className="SMtext">
                  実施時間 {year}年{month}月{day}日 {startTime}~{endTime}
                </p>
              </div>
              <div id="between-left-right">
                <p></p>
                <p className="SMtext" style={{ paddingTop: "20px" }}>
                  {SelectLecture.name}
                </p>
                {/* </p>これは講師名だからuidから再度取得する必要がある？ */}
                <p className="SMtext "></p>
              </div>
            </div>
            <div id="between-right">
              <p className="SMTitle" style={{ marginRight: "20px" }}>
                講義コード
              </p>
              <div id="between-right-inside">
                <p id="SMCode">{code}</p>
                <p id="coppy" onClick={handleCopyBtn}>
                  <ContentCopyIcon sx={{ color: "blue" }}></ContentCopyIcon>
                </p>
              </div>
            </div>
          </div>

          <div id="explanationFrame">
            <p className="SMTitle">説明</p>
            <p className="SMtext" style={{ textAlign: "left" }}>
              {description}
            </p>
          </div>

          <div id="materialsFrame">
            <p className="SMTitle">資料</p>
            <p className="SMtext" style={{ textDecorationLine: "underline" }}>
              <a href={url} target="_blank" rel="noopener noreferre">
                資料
              </a>
            </p>
          </div>

          <div id="scriptFrame">
            <p className="SMTitle">スクリプト</p>
            <ScriptList documentId={docId} />
          </div>
        </div>
        <div id="borderline"></div>

        <div>
          <button
            className="StartBtn"
            // sx={{ background: " #ffca75", color: "black" }}
            onClick={handleStart}
          >
            講義を開始する
          </button>
        </div>
      </div>
    </>
  );
}
export default StartModal;
