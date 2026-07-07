import React, { useState, useEffect } from "react";
import Pdf from "./Pdf";
import { useAtom } from "jotai";
import { showTestPdfURL } from "./atom";

function FileSelectURL() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [testPdfURL, setSelectTestPdfURL] = useAtom(showTestPdfURL);

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
  console.log(testPdfURL);

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
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
