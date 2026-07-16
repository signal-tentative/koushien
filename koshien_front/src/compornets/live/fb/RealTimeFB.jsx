import { useEffect, useState } from "react";
import dayjs from "dayjs";

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
      const currentFormattedTime = dayjs().format("YYYY-MM-DD[T]HH:mm:ss");
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
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("サーバーからのレスポンス:", data);
          if (data.status === 400 || data.status === 500 || data.insight === "")
            return;
          setInsightText((prev) => {
            const currentList = Array.isArray(prev) ? prev : [];
            return [...currentList, data];
          });
        })
        .catch((error) => console.error("送信エラー:", error));
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [lecture]);
  return (
    <>
      <div
        className="FBContainer"
        style={{
          height: "500px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
          marginTop: "-50px",
        }}
      >
        <div>リアルタイムフィードバック</div>
        {insightText
          .sort((a, b) => b.id - a.id)
          .map((data) => {
            const json = JSON.parse(data.insight);
            console.log(json);
            const formattedDate = new Intl.DateTimeFormat("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // 24時間表記にする
            }).format(new Date(data.time));
            return (
              <div className="FBContener">
                <div className="FBheader">{formattedDate}</div>
                <div className="FBbody">未捕捉</div>
                <div style={{ position: "relative", bottom: 10, fontSize: 16 }}>
                  <div>【AI回答】 : {json.context}。</div>
                  <div>【理由】 : {json.reason}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default RealTimeFB;
