import { useAtom } from "jotai";
import { atomSettingModal } from "../atoms";
import { atomUploadJotai } from "./atoms";

import { useState, useEffect, useRef } from "react";
import "./modal.css";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import * as pdfjsLib from "pdfjs-dist";

import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
// pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cloudflare.com";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function CreateLectureModal({ handleClose }) {
  const uid = localStorage.getItem("user_uid");
  const [titlejotai, settitlejotai] = useState("default");
  const [explanationjotai, setexplanationjotai] = useState("default");
  const [uploadJotai, setUploadJotai] = useAtom(atomUploadJotai);

  // 講義タイトル
  const [certTitle, setCertTitle] = useState("");
  // 講義説明
  const [certExplanation, setCertExplanation] = useState(""); //元の名前を入れておくべき

  //資料実体
  const [files, setFiles] = useState([]);
  //file page
  const [page, setPage] = useState([0]);
  //script
  const [scripts, setScripts] = useState([]);

  const [date, setDate] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  useEffect(() => {
    console.log(files);
    console.log(files[0]);

    // ここで資料のページを計算
    setPage(10);
  }, [files]);

  function handleCloseBtn() {
    handleClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      if (!certTitle || !certExplanation) {
        if (!certTitle) {
          settitlejotai("error");
        }
        if (!certExplanation) {
          setexplanationjotai("error");
        }
        setUploadJotai("error");
        return;
      }
      return;
    }

    // setLoading(true);

    const formData = new FormData();
    formData.append("title", certTitle);
    formData.append("code", Math.round(Math.random() * 10000));
    formData.append("description", certExplanation);
    formData.append("execute", false);
    formData.append("uid", uid);
    formData.append("startDate", `${date}${time1}`);
    formData.append("endDate", `${date}${time2}`);

    console.log(`${date}${time2}`);

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

      //本当は複数できる必要があるが、今回は一つにする
      const formFile = new FormData();
      formFile.append("file", files[0]);
      formFile.append("lecture_id", lectureId); // 正しいIDをセット
      const res = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        method: "POST",
        body: formFile,
      });
      // document_id欲しい
      if (!res.ok) {
        throw new Error("ファイルのアップロードに失敗しました");
      }

      const docJson = await res.json();
      const docId = docJson.id;

      console.log(scripts);
      scripts.forEach(async (ele) => {
        // scriptsの書き込み
        const formScripts = new FormData();
        formScripts.append(
          "script",
          ele.script === undefined ? "" : ele.script,
        );
        formScripts.append("page", ele.page);
        formScripts.append("document_id", docId);

        const scriptRes = await fetch(
          `${import.meta.env.VITE_API_URL}/scripts`,
          {
            method: "POST",
            body: formScripts,
          },
        );
      });

      alert("講義の登録とS3へのアップロードが完了しました！");
      // setLectureName("");
      // setLectureVoice("");
      // setPdfFile(null);
    } catch (error) {
      console.error("エラー:", error);
      alert(error.message || "通信エラーが発生しました");
    } finally {
      // setLoading(false);
    }
  };
  const [pageCount, setPageCount] = useState(null);

  const handleFileChange = (event) => {
    // 1. ファイルが正しく選択されているか厳密にチェック
    const file = event.target.files?.[0];
    if (!file) {
      console.warn("ファイルが選択されていません。");
      return;
    }

    const fileReader = new FileReader();

    // 2. 読み込み完了時のイベントハンドラーを定義
    fileReader.onload = async (e) => {
      try {
        const result = e.target?.result;
        if (!result) {
          throw new Error("ファイルの読み込み結果が空です。");
        }

        // 3. バイナリデータ（ArrayBuffer）を型付き配列に変換
        const typedarray = new Uint8Array(result);

        // 4. 【重要】オブジェクト形式で `data` パラメータとして渡す
        const loadingTask = pdfjsLib.getDocument({ data: typedarray });
        const pdf = await loadingTask.promise;

        // 5. 総ページ数をステートにセット
        console.log("パース成功。総ページ数:", pdf.numPages);
        setPageCount(pdf.numPages);
      } catch (error) {
        // CreateLectureModal.jsx:162 のエラーハンドリング
        console.error("PDFの読み込みに失敗しました:", error);
      }
    };

    // 6. 実際の読み込み処理をキック（これを最後に呼ぶ）
    fileReader.readAsArrayBuffer(file);
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
                  defaultValue={dayjs("2026-07-17")}
                  style={{ width: "100px" }}
                  onChange={(e) => {
                    setDate(dayjs(e["$d"]).format("YYYY-MM-DD"));
                  }}
                />

                <TimePicker
                  className="TimePicker"
                  label="16:30"
                  onChange={(e) => {
                    setTime1(dayjs(e["$d"]).format("Thh:mm:ss"));
                  }}
                />
                <TimePicker
                  className="TimePicker"
                  label="17:30"
                  onChange={(e) => {
                    setTime2(dayjs(e["$d"]).format("Thh:mm:ss"));
                  }}
                />
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
              <div>
                {/* <DriveFolderUploadIcon /> */}
                <div className="inputTitle">講義資料をアップロード</div>
                <input
                  className="inputBox"
                  type="file"
                  placeholder="この講義についての説明"
                  onChange={(e) => {
                    handleFileChange(e);
                    setFiles(e.target.files);
                  }}
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
                  onChange={(e) => {
                    handleFileChange(e);
                    setFiles(e.target.files);
                  }}
                />
              </div>
            )}
          </div>
          <div id="CLRight">
            <div id="inputTitle">講義資料</div>
            <div id="NameAndDelete">
              <div id="inputTitleName">
                {files.length === 0 ? "資料がありません" : files[0].name}
              </div>
              {/* <DeleteIcon className="CLRdelete" onClick={() => {}} /> */}
            </div>
            <p id="scriptTitle">スクリプト</p>
            <div id="CLscriptframe">
              {/* ここを資料ページ数にする */}
              {[...Array(pageCount)].map((ele, ind) => {
                const currentPage = ind + 1; // ページ数を共通化

                return (
                  // 配列のループ表示には、一意の「key」プロパティが必須です
                  <ul className="CLscriptContainer" key={currentPage}>
                    <div>{currentPage}</div>
                    <input
                      className="scriptinputBox"
                      type="text"
                      placeholder="このスライドについての説明を入力"
                      // 状態（State）から現在の入力値をリアルタイムに反映
                      value={scripts[ind]?.script || ""}
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        // 1. 現在のscripts配列を新しい配列にコピー（イミュータブルな更新）
                        const updatedScripts = [...scripts];

                        // 2. 該当するページのオブジェクトを作成して格納
                        updatedScripts[ind] = {
                          script: inputValue,
                          page: currentPage,
                        };

                        // 3. 新しい配列をセットすることでReactに変更を通知する
                        setScripts(updatedScripts);
                        console.log(scripts);
                      }}
                    />
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
        <div id="borderline"></div>
        {uploadJotai == "default" ? (
          <div>
            <button className="saveBtn" onClick={handleSubmit}>
              作成する
            </button>
          </div>
        ) : (
          <div className="errorloginBox">
            <button className="saveBtn" onClick={handleSubmit}>
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
