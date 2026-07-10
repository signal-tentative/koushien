import { useState } from "react";
import { useAtom } from "jotai";
import { showRecording } from "../../instructer/atom";
import { divide } from "firebase/firestore/pipelines";
function Recording() {
  let timer = null;
  const silence_duration = 3000;

  const [recordingStatus, setRecordingStatus] = useAtom(showRecording);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("お使いのブラウザは音声認識に対応していません。");
  } else {
    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.interimResults = true;
    recognition.continuous = true; // 再起動ループ
    const SpeakingResult = [];

    const handleStart = () => {
      setRecordingStatus(true);
      recognition.start();
      console.log("start");
    };

    const handleStop = () => {
      setRecordingStatus(false);
      recognition.stop();
      console.log("stop");
    };

    recognition.onstart = () => {
      console.log("録音中"); //開始の検知
    };

    // 停止時の処理
    recognition.onend = () => {
      if (showRecording) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {
            console.error("再起動失敗:", e);
          }
        }, 50);
      } else {
        console.log("停止中");
      }
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript.trim();
        if (transcript !== "") {
          if (timer) {
            clearT(timer);
          }
          if (event.results[i].isFinal) {
            let date = new Date();
            let year = date.getFullYear();
            let month = ("00" + (date.getMonth() + 1)).slice(-2);
            let day = ("00" + date.getDate()).slice(-2);
            let hour = ("00" + date.getHours()).slice(-2);
            let min = ("00" + date.getMinutes()).slice(-2);
            let sec = ("00" + date.getSeconds()).slice(-2);
            const timeData = year + month + day + hour + min + sec;
            SpeakingResult.push({
              text: transcript,
              time: timeData,
            });
            console.log(SpeakingResult);
          }
        }
      }
    };

    recognition.onerror = (event) => {
      //話してない時のエラー無視
      if (recordingStatus && event.error === "no-speech") {
      }
    };

    return (
      <>
        音声
        {!recordingStatus && (
          <button onClick={handleStart}>録音スタート</button>
        )}
        {recordingStatus && (
          <button disabled onClick={handleStart}>
            録音スタート
          </button>
        )}
        {recordingStatus && <button onClick={handleStop}>録音ストップ</button>}
        {!recordingStatus && (
          <button disabled onClick={handleStop}>
            録音ストップ
          </button>
        )}
      </>
    );
  }
}

export default Recording;
