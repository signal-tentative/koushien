import React, { useState } from "react";
import { Pdf } from "./Pdf";

function FileSelectURL() {
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
