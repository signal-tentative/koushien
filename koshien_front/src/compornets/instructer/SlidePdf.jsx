import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useAtom, useAtomValue } from "jotai";
import { showTestPdfURL } from "./atom";

const SlidePdf = () => {
  const [numPages, setNumPages] = useState(
    () => localStorage.getItem("numPages") || "",
  );
  const [scale, setScale] = useState(1.0);
  const [url, setUrl] = useState(() => localStorage.getItem("pdfurl") || "");
  const [page, setPage] = useState(
    () => localStorage.getItem("pageNumber") || "",
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "pdfurl") {
        setUrl(event.newValue || "");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
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
  }, [page]);
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
  console.log(url, page, numPages);

  return (
    <div>
      <Document file={url}>
        <Page
          key={`${page}_${scale}`}
          pageNumber={Number(page)}
          scale={scale}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

export default SlidePdf;
