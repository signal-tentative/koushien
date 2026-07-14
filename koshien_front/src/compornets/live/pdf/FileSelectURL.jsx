import React, { useState, useEffect } from "react";
import Pdf from "./Pdf";
import { useAtom } from "jotai";
import { showTestPdfURL } from "../atom";

function FileSelectURL() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [testPdfURL, setSelectTestPdfURL] = useAtom(showTestPdfURL);
  const [lectures, setLectures] = useState();
  const [lecture, setLecture] = useState();
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);

  const uid = localStorage.getItem("user_uid");

  useEffect(() => {
    const res = fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        setLecture(data);
      });
  }, []);

  const handleDocument = async () => {
    console.log(lecture);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/documents/${lecture[0].id}`,
      );
      if (!res.ok) throw new Error("バックエンドの通信に失敗しました");

      const data = await res.json();
      setLectures(data.link);

      const response = await fetch(data.link);
      if (!response.ok) throw new Error(`S3エラー: ${response.status}`);

      const blob = await response.blob();

      const localUrl = URL.createObjectURL(blob);
      setPdfFile(localUrl);
      setSelectedPdf(localUrl);
      setSelectTestPdfURL(localUrl);
      localStorage.setItem("pdfurl", localUrl);
    } catch (err) {
      console.error("PDF取得エラー:", err);
      setError(err.message);
    }
  };

  // useEffect(() => {
  //   fetch(lectures)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       const localUrl = URL.createObjectURL(blob);
  //       console.log("取得");
  //       setPdfFile(localUrl);
  //     })
  //     .catch((err) => {
  //       console.error("PDFの取得に失敗しました:", err);
  //       setError(err.message);
  //     });
  // }, [handleDocument, lectures]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setSelectedPdf(fileUrl);
      setSelectTestPdfURL(fileUrl);
      localStorage.setItem("pdfurl", fileUrl);
    } else {
      alert("PDFファイルを選択してください。");
    }
  };
  console.log(lectures);

  return (
    <div>
      <button onClick={handleDocument}>講義資料表示</button>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {pdfFile ? <Pdf url={pdfFile} /> : <p>PDFファイル表示場所</p>}
    </div>
  );
}

export default FileSelectURL;
