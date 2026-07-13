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

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateLectureModal({ handleClose }) {
  const [titlejotai, settitlejotai] = useState("default");
  const [explanationjotai, setexplanationjotai] = useState("default");
  const [uploadjotai, setuploadjotai] = useState("default");

  const [certTitle, setCertTitle] = useState("");
  const [certExplanation, setCertExplanation] = useState("");

  function handleCloseBtn() {
    handleClose();
  }
  function handleSave() {
    if (!certTitle || !certExplanation) {
      if (!certTitle) {
        settitlejotai("error");
      }
      if (!certExplanation) {
        setexplanationjotai("error");
      }
      setuploadjotai("error");
      return;
    }
    //post
    console.log("create");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("PDFファイルを選択してください");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", lectureName);
    formData.append("code", lectureVoice);
    formData.append("description", "test");
    formData.append("execute", true);
    formData.append("uid", "oXDcNmenukbGqh9jOrApoBwTWYF2");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/lectures`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("講義の登録に失敗しました");
      }

      const lectureData = await response.json();
      console.log("保存された講義データ:", lectureData);

      const lectureId = lectureData.id;

      const formFile = new FormData();
      formFile.append("file", pdfFile);
      formFile.append("lecture_id", lectureId); // 正しいIDをセット

      const res = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        method: "POST",
        body: formFile,
      });

      if (!res.ok) {
        throw new Error("ファイルのアップロードに失敗しました");
      }

      alert("講義の登録とS3へのアップロードが完了しました！");
      setLectureName("");
      setLectureVoice("");
      setPdfFile(null);
    } catch (error) {
      console.error("エラー:", error);
      alert(error.message || "通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="board CreateLectureModal">
        <div id="CLTitle">
          <p>講義作成</p>
          <p id="CLbatten" onClick={handleCloseBtn}>
            ×
          </p>
        </div>
        <div id="borderline"></div>
        <div className="CLyoko">
          <div id="LCLeft">
            {titlejotai == "default" ? (
              <div className="inputAdress">
                <div className="inputTitle">講義タイトル</div>
                <input
                  className="inputBox"
                  type="text"
                  placeholder="例：マルチパスウェイ戦略入門"
                  onChange={(e) => setCertTitle(e.target.value)}
                />
              </div>
            ) : (
              <div className="inputContener">
                <div className="inputTitle" style={{ color: "red" }}>
                  講義タイトル
                </div>
                <input
                  className="errorinput"
                  type="text"
                  placeholder="例:マルチパスウェイ戦略入門"
                  onChange={(e) => setCertTitle(e.target.value)}
                />
              </div>
            )}
            <div className="inputDateContainer">
              <LocalizationProvider
                className="inputDateContainer"
                dateAdapter={AdapterDayjs}
              >
                <DesktopDatePicker
                  className="DatePicker"
                  defaultValue={dayjs("2026-07-08")}
                  style={{ width: "100px" }}
                />

                <TimePicker className="TimePicker" label="16:30" />
                <TimePicker className="TimePicker" label="17:30" />
              </LocalizationProvider>
            </div>

            {explanationjotai == "default" ? (
              <div className="inputAdress">
                <div className="inputTitle">説明</div>
                <input
                  className="inputBox"
                  type="text"
                  placeholder="この講義についての説明"
                  onChange={(e) => setCertExplanation(e.target.value)}
                />
              </div>
            ) : (
              <div className="inputContener">
                <div className="inputTitle" style={{ color: "red" }}>
                  説明
                </div>
                <input
                  className="errorinput"
                  type="text"
                  placeholder="この講義についての説明"
                  onChange={(e) => setCertExplanation(e.target.value)}
                />
              </div>
            )}
            {explanationjotai == "default" ? (
              <div className="inputAdress">
                <DriveFolderUploadIcon />
                <div className="inputTitle">講義資料をアップロード</div>
                <input
                  className="inputBox"
                  type="file"
                  placeholder="この講義についての説明"
                  onChange={(e) => setCertExplanation(e.target.value)}
                />
              </div>
            ) : (
              <div className="inputContener">
                <div className="inputTitle" style={{ color: "red" }}>
                  講義資料をアップロード
                </div>
                <input
                  className="errorinput"
                  type="file"
                  placeholder="この講義についての説明"
                  onChange={(e) => setCertExplanation(e.target.value)}
                />
              </div>
            )}
          </div>
          <div id="CLRight">
            <div id="inputTitle">講義資料</div>
            <div id="NameAndDelete">
              <div id="inputTitleName">講義.name</div>
              <DeleteIcon className="CLRdelete" />
            </div>
            <p id="scriptTitle">スクリプト</p>
            <div id="CLscriptframe">
              <ul className="CLscriptContainer">
                <div>1</div>
                <input
                  className="scriptinputBox"
                  type="text"
                  placeholder="このスライドについての説明を入力"
                  onChange={(e) => setCertExplanation(e.target.value)}
                />
              </ul>
              <ul className="CLscriptContainer">
                <p>2</p>
                <input
                  className="scriptinputBox"
                  type="text"
                  placeholder="このスライドについての説明を入力"
                  onChange={(e) => setCertExplanation(e.target.value)}
                />
              </ul>
              <ul className="CLscriptContainer">
                <p>3</p>
                <input
                  className="scriptinputBox"
                  type="text"
                  placeholder="このスライドについての説明を入力"
                  onChange={(e) => setCertExplanation(e.target.value)}
                />
              </ul>
              <ul className="CLscriptContainer">
                <p>4</p>
                <input
                  className="scriptinputBox"
                  type="text"
                  placeholder="このスライドについての説明を入力"
                  onChange={(e) => setCertExplanation(e.target.value)}
                />
              </ul>
            </div>
          </div>
        </div>
        <div id="borderline"></div>
        {uploadjotai == "default" ? (
          <div>
            <button className="saveBtn" onClick={handleSubmit}>
              作成する
            </button>
          </div>
        ) : (
          <div className="errorloginBox">
            <button className="saveBtn" onClick={handleSave}>
              作成する
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
export default CreateLectureModal;
