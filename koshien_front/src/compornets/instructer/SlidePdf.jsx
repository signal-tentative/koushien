import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Pdf = ({ url }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages));

  return (
    <div>
      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page
          key={`${pageNumber}_${scale}`}
          pageNumber={pageNumber}
          scale={scale}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

export default Pdf;
