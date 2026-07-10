import React, { useState, useEffect } from "react";
import Pdf from "./Pdf";
import { useAtom } from "jotai";
import { showTestPdfURL } from "./atom";

function FileSelectURL() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [testPdfURL, setSelectTestPdfURL] = useAtom(showTestPdfURL);
  const [lectures, setLectures] = useState();

  const handleDocument = () => {
    const lecture = fetch(`${import.meta.env.VITE_API_URL}/documents/1`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLectures(data);
      });
  };

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
  const uid = localStorage.getItem("user_uid");
  console.log(selectedPdf);

  return (
    <div>
      <button onClick={handleDocument}>布団</button>
      <input type="file" accept=".pdf" onChange={handleDocument} />
      {selectedPdf ? (
        <div style={{ border: "1px solid #ccc", background: "#fff" }}>
          <Pdf url={selectedPdf} />
        </div>
      ) : (
        <p>PDFファイル表示場所</p>
      )}
    </div>
  );
}

export default FileSelectURL;
