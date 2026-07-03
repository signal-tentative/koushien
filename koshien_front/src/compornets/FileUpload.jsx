import React, { useState } from "react";

export const LectureUpload = () => {
  const [lectureName, setLectureName] = useState("");
  const [lectureVoice, setLectureVoice] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ファイルが選択
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  // 送信ボタン
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("PDFファイルを選択してください");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append("lectureName", lectureName);
    formData.append("lectureVoice", lectureVoice);
    formData.append("file", pdfFile);

    try {
      const response = await fetch("http://localhost:8080/lectures", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("アップロードに失敗しました");
      }

      const data = await response.json();
      console.log("保存されたデータ:", data);
      alert("講義の登録とS3へのアップロードが完了しました！");
      setLectureName("");
      setLectureVoice("");
      setPdfFile(null);
    } catch (error) {
      console.error("エラー:", error);
      alert("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
      }}
    >
      <h2>講義登録 (S3アップロード)</h2>

      <label>
        講義名:
        <input
          type="text"
          value={lectureName}
          onChange={(e) => setLectureName(e.target.value)}
          required
        />
      </label>

      <label>
        レクチャーボイス
        <input
          type="text"
          value={lectureVoice}
          onChange={(e) => setLectureVoice(e.target.value)}
          required
        />
      </label>

      <label>
        PDF:
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "アップロード中..." : "登録する"}
      </button>
    </form>
  );
};
