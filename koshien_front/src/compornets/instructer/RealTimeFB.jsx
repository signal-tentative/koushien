import { useEffect, useState } from "react";

function RealTimeFB() {
  const uid = localStorage.getItem("user_uid");
  const [lecture, setLecture] = useState();
  const [document, setDocument] = useState();
  const [insightText, setInsightText] = useState([]);

  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/uid/${uid}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        setLecture(datas[0]?.id);
      });
  }, []);

  useEffect(() => {
    const document = fetch(
      `${import.meta.env.VITE_API_URL}/documents/${lecture}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDocument(data?.id);
      });
  }, [lecture]);

  const [page, setPage] = useState(
    () => localStorage.getItem("pageNumber") || "",
  );
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
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentFormattedTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      console.log("定期送信:", currentFormattedTime);

      const formData = new FormData();
      formData.append("lecture_id", lecture);
      formData.append("time", currentFormattedTime);
      formData.append("insight", "");
      formData.append("rate", "0.0");
      formData.append("checked", "false");

      const res = fetch(`${import.meta.env.VITE_API_URL}/insights`, {
        method: "POST",
        body: formData,
      });

      setInsightText([...res]);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [lecture]);

  console.log(insightText);

  return (
    <>
      <div className="FBContainer">
        <div>リアルタイムフィードバック</div>
        <div className="FBContener">
          <div className="FBheader">
            <div>S1</div>
            <div>4名</div>
          </div>
          <div className="FBtext">
            …トヨタのマルチパスウェイ戦略とは、複数の技術を並行開発していくです。
          </div>
        </div>
      </div>
    </>
  );
}

export default RealTimeFB;
