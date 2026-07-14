import { useAtom } from "jotai";
import { showRecording } from "../../instructer/atom";
import { divide } from "firebase/firestore/pipelines";
import { useState, useEffect, useRef } from "react";

function Recording() {
  const silence_duration = 3000;
  const [count, setCount] = useState(0);
  const [recordingStatus, setRecordingStatus] = useAtom(showRecording);

  const recognitionRef = useRef(null);
  const speakingResultRef = useRef([]);
  const silenceTimerRef = useRef(null);
  const uid = localStorage.getItem("user_uid");
  const [lecture, setLecture] = useState();
  const [document, setDocument] = useState();

  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        setLecture(datas[0]?.id);
      });
  }, []);

  useEffect(() => {
    const document = fetch(
      `${import.meta.env.VITE_API_URL}/documents/${lecture}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDocument(data?.id);
      });
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

  const [page, setPage] = useState(
    () => localStorage.getItem("pageNumber") || "",
  );
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
  }, []);

  console.log(lecture);
  console.log(document);
  console.log(page);

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

    recognition.onend = () => {
      console.log("onendイベント発生");
    };

    recognition.onresult = async (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript.trim();
        if (transcript !== "") {
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

          if (event.results[i].isFinal) {
            const date = new Date();
            const timeData =
              date.getFullYear() +
              ("00" + (date.getMonth() + 1)).slice(-2) +
              ("00" + date.getDate()).slice(-2) +
              ("00" + date.getHours()).slice(-2) +
              ("00" + date.getMinutes()).slice(-2) +
              ("00" + date.getSeconds()).slice(-2);

            speakingResultRef.current.push({
              text: transcript,
              time: timeData,
            });
            console.log(speakingResultRef.current);

            const formData = new FormData();
            formData.append("lecture_id", lecture);
            formData.append("document_id", document);
            formData.append("page", Number(page));
            formData.append("transcript", transcript);
            formData.append("time", "2026-07-14T01:00:00");

            try {
              await fetch(`${import.meta.env.VITE_API_URL}/transcriptions`, {
                method: "POST",
                body: formData,
              });
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
  }, [page]);

  if (recognitionRef.current) {
    recognitionRef.current.onend = () => {
      if (recordingStatus) {
        console.log("自動再起動します...");
        setTimeout(() => {
          try {
            recognitionRef.current.start();
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
