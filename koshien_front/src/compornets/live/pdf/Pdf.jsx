import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Pdf = ({ url }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    localStorage.setItem("pageNumber", pageNumber);
  }, [goToPrevPage]);

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
    localStorage.setItem("pageNumber", pageNumber);
  };

  useEffect(() => {
    localStorage.setItem("pageNumber", pageNumber);
  }, [goToNextPage]);

  console.log(url);
  return (
    <div>
      <Document
        className="PDFmain"
        file={url}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          localStorage.setItem("numPages", numPages);
        }}
      >
        <Page
          key={`${pageNumber}_${scale}`}
          pageNumber={pageNumber}
          scale={scale}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <div>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          前
        </button>
        <span>
          {pageNumber} / {numPages || "-"}
        </span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          次
        </button>
      </div>
    </div>
  );
};

export default Pdf;
