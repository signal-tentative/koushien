import { divide } from "firebase/firestore/pipelines";
import { useState, useEffect } from "react";
import FileSelectURL from "./pdf/FileSelectURL";
import PointTitle from "./liveheader/PointTitle";
import RealTimeFB from "./fb/RealTimeFB";
import Script from "./script/Script";
import LiveHeader from "./LiveHeader";
import Recording from "./recording/Recording";
import "./live.css";
import { useNavigate, useLocation } from "react-router";
function Live() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lecture, setLecture] = useState();

  const { lecture_id } = location.state || {};
  console.log(lecture_id);

  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/lectures/${lecture_id}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        setLecture(datas);
      });
  }, []);
  console.log(lecture);

  const handleEnd = async () => {
    const endJudge = window.confirm("講義を終了しますか？");
    if (!endJudge) return;

    const formData = new FormData();
    formData.append("code", lecture.code);
    formData.append("title", lecture.title);
    formData.append("description", lecture.description);
    formData.append("execute", true);
    formData.append("startDate", lecture.startDate);
    formData.append("endDate", lecture.endDate);
    formData.append("uid", lecture.user.uid);
    console.log("フォームデータ", formData);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/lectures/${lecture.code}`,
        {
          method: "PATCH",
          body: formData,
        },
      );
      console.log(res.json());
      navigate("/dashman");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <LiveHeader lecture_id={lecture_id} />
      <div className="Screen">
        <div id="ScreenLeft">
          <FileSelectURL lecture_id={lecture_id} />
          <div>
            <Recording />
          </div>
          <Script />
        </div>
        <div id="ScreenRight">
          <button className="endBtn" onClick={handleEnd}>
            講義を終了
          </button>
          <PointTitle />
          <RealTimeFB />
        </div>
      </div>
    </>
  );
}

export default Live;
