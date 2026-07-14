import Button from "@mui/material/Button";
import { timestampAdd } from "firebase/firestore/pipelines";
import { useState } from "react";

function What() {
  const uid = localStorage.getItem("user_uid");
  //   const [nowTime, setNowTime] = useState("");

  //   function timeStamp() {
  //     const timestamp = Date.now();
  //     const isoString = new Date(timestamp).toISOString();
  //     const result = isoString.slice(0, 19);
  //     setNowTime(result);
  //   }

  const handleButton = () => {
    const formData = new FormData();
    formData.append("lecture_id", 1);
    formData.append("user_uid", uid);
    formData.append("time", () => {
      const timestamp = Date.now();
      const isoString = new Date(timestamp).toISOString();
      const result = isoString.slice(0, 19);
      console.log(result);
      return result;
    });

    fetch(`${import.meta.env.VITE_API_URL}/reactions`, {
      method: "POST",
      body: formData,
    });
    console.log("わからないが送信されました");
  };
  return (
    <>
      <div>
        <p>わかって</p>
        <Button
          id="what_button"
          onClick={() => {
            handleButton();
          }}
        >
          <p>わからない</p>
        </Button>
      </div>
    </>
  );
}

export default What;
