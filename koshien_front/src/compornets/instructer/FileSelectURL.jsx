import React, { useState } from "react";
import { Pdf } from "./Pdf";

const FileSelectURL = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setSelectedPdf(fileUrl);
    } else {
      alert("PDFファイルを選択してください。");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#f0f2f5",
        minHeight: "100vh",
        width: "700px",
      }}
    >
      <h1>PDF送り見</h1>
      <div style={{ marginBottom: "20px" }}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      {selectedPdf ? (
        <div style={{ border: "1px solid #ccc", background: "#fff" }}>
          <Pdf url={selectedPdf} />
        </div>
      ) : (
        <p>PDFファイル表示場所</p>
      )}
    </div>
  );
};

export default FileSelectURL;
