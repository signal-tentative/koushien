import Button from "@mui/material/Button";
import { useState } from "react";

const handleButton = () => {
  const [nowTime, setNowTime] = useState("");
  const timestamp = Date.now();

  const isoString = new Date(timestamp).toISOString();
  const result = isoString.slice(0, 19);
  setNowTime(result);

  const formData = new FormData();
  formData.append("lecture_id", 1);
  formData.append("uid", "oXDcNmenukbGqh9jOrApoBwTWYF2");
  formData.append("time", nowTime);

  fetch(`${import.meta.env.VITE_API_URL}/reactions`, {
    method: "POST",
    body: formData,
  });
};

const response = await fetch(`${import.meta.env.VITE_API_URL}/lectures`, {
  method: "POST",
  body: formData,
});

function What() {
  return (
    <>
      <div>
        <p>わかって</p>
        <Button id="what_button" onClick={() => {}}>
          <p>わからない</p>
        </Button>
      </div>
    </>
  );
}

export default What;
