import { useAtom } from "jotai";
import { showRecording } from "../../instructer/atom";
import { divide } from "firebase/firestore/pipelines";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

function Recording() {
  const silence_duration = 3000;
  const [count, setCount] = useState(0);
  const [recordingStatus, setRecordingStatus] = useAtom(showRecording);

  const recognitionRef = useRef(null);
  const speakingResultRef = useRef([]);
  const silenceTimerRef = useRef(null);
  const uid = localStorage.getItem("user_uid");

  const [lecture, setLecture] = useState(0);
  const [document, setDocument] = useState(0);
  const [page, setPage] = useState(
    () => localStorage.getItem("pageNumber") || "",
  );
  const [numPages, setNumPages] = useState(
    () => localStorage.getItem("numPages") || "",
  );

  const latestParamsRef = useRef({ lecture: 0, document: 0 });

  useEffect(() => {
    latestParamsRef.current = { lecture, document };
  }, [lecture, document]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log("講義データ:", datas);
        if (datas && datas[0]) {
          setLecture(datas[0].id);
        }
      })
      .catch((err) => console.error("講義取得エラー:", err));
  }, [uid]);

  useEffect(() => {
    if (lecture === 0) return;
    fetch(`${import.meta.env.VITE_API_URL}/documents/${lecture}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("ドキュメントデータ:", data);
        if (data) {
          setDocument(data.id);
        }
      })
      .catch((err) => console.error("ドキュメント取得エラー:", err));
  }, [lecture]);

  useEffect(() => {
    let timer;
    if (recordingStatus) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    } else {
      setCount(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [recordingStatus]);

  useEffect(() => {
    const handleStorageChange_page = (event) => {
      if (event.key === "pageNumber") {
        setPage(event.newValue || "");
      }
    };
    window.addEventListener("storage", handleStorageChange_page);
    return () => {
      window.removeEventListener("storage", handleStorageChange_page);
    };
  }, [page, setPage]);
  useEffect(() => {
    const handleStorageChange_numPage = (event) => {
      if (event.key === "numPages") {
        setNumPages((numPages) => (numPages = event.newValue || ""));
      }
    };
    window.addEventListener("storage", handleStorageChange_numPage);
    return () => {
      window.removeEventListener("storage", handleStorageChange_numPage);
    };
    console.log(numPages);
  }, [numPages, setNumPages]);

  console.log("現在のステート確認:", { lecture, document });
  console.log("page", page);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("お使いのブラウザは音声認識に対応していません。");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      console.log("録音中");
    };

    recognition.onresult = async (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript.trim();
        if (transcript !== "") {
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

          if (event.results[i].isFinal) {
            const currentFormattedTime = dayjs().format(
              "YYYY-MM-DD[T]HH:mm:ss",
            );
            console.log("定期送信:", currentFormattedTime);
            speakingResultRef.current.push({
              text: transcript,
              time: currentFormattedTime,
            });

            const { lecture: currentLecture, document: currentDocument } =
              latestParamsRef.current;

            console.log("API送信パラメータ確認:", {
              currentLecture,
              currentDocument,
            });

            const formData = new FormData();
            formData.append("lecture_id", Number(currentLecture));
            formData.append("document_id", Number(currentDocument));
            formData.append("page", localStorage.getItem("pageNumber"));
            formData.append("transcript", transcript);
            formData.append("time", currentFormattedTime);

            try {
              await fetch(`${import.meta.env.VITE_API_URL}/transcriptions`, {
                method: "POST",
                body: formData,
              });
              console.log("送信成功");
            } catch (e) {
              console.error("送信失敗:", e);
            }
          }
        }
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "no-speech") {
        console.error("音声認識エラー:", event.error);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  if (recognitionRef.current) {
    recognitionRef.current.onend = () => {
      if (recordingStatus) {
        console.log("自動再起動します...");
        setTimeout(() => {
          try {
            if (recognitionRef.current) recognitionRef.current.start();
          } catch (e) {
            console.error("再起動失敗:", e);
          }
        }, 50);
      } else {
        console.log("停止中");
      }
    };
  }

  const handleStart = () => {
    if (recognitionRef.current) {
      setRecordingStatus(true);
      try {
        recognitionRef.current.start();
        console.log("start");
      } catch (e) {
        console.error("開始失敗:", e);
      }
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      setRecordingStatus(false);
      recognitionRef.current.stop();
      console.log("stop");
    }
  };

  return (
    <>
      <p>音声ステータス: {recordingStatus ? "録音中" : "停止中"}</p>
      <button onClick={handleStart} disabled={recordingStatus}>
        録音スタート
      </button>
      <button onClick={handleStop} disabled={!recordingStatus}>
        録音ストップ
      </button>
      <div>経過時間: {count}秒</div>
    </>
  );
}

export default Recording;
