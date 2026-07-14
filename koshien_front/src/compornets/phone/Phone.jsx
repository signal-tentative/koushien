import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import "./phone.css";

// const handleButton = () => {
//   const [nowTime, setNowTime] = useState("");
//   const timestamp = Date.now();

//   const isoString = new Date(timestamp).toISOString();
//   const result = isoString.slice(0, 19);
//   setNowTime(result);

//   const formData = new FormData();
//   formData.append("lecture_id", 1);
//   formData.append("uid", "oXDcNmenukbGqh9jOrApoBwTWYF2");
//   formData.append("time", nowTime);

//   fetch(`${import.meta.env.VITE_API_URL}/reactions`, {
//     method: "POST",
//     body: formData,
//   });
// };

// const response = await fetch(`${import.meta.env.VITE_API_URL}/lectures`, {
//   method: "POST",
//   body: formData,
// });
import q_ta from "/public/Signal-2.png";
import dayjs from "dayjs";

function Phone() {
  const [array, setArray] = useState([]);
  // const [mowa, setMowa] = useState(false);

  // function handleWhat() {
  //   setMowa(true);
  //   console.log("push");
  //   setTimeout(() => {
  //     setMowa(false);
  //   }, 3000);
  // }
  function handleWhat() {
    const now = new Date();
    setArray([...array, dayjs(now).format("HH:mm")]);
    console.log(array);
  }
  let time1 = "10:01";
  let time2 = "10:01";
  let time3 = "10:01";
  useEffect(() => {
    const now = new Date();
    time1 = dayjs(now).format("HH:mm" - "00:01");
    time2 = dayjs(now).format("HH:mm");
    time3 = dayjs(now).format("HH:mm");
  }, []);

  return (
    <>
      <div className="PhoneFrame">
        <div className="PhoneHeader">学びのシグナル</div>
        <div>
          <div className="TalkFrame">
            <div className="talk">
              <img className="talk_Q_ta" src={q_ta} alt="bookIcon" />
              <p className="board PhoneText">
                わからないなって思ったら押してね！
                <p>{time1}</p>
              </p>
            </div>
            <div className="talk">
              <img className="talk_Q_ta" src={q_ta} alt="bookIcon" />
              <p className="board PhoneText">
                みんなの反応で講義が良くなるよ！
                <p>{time2}</p>
              </p>
            </div>
            <div className="talk">
              <img className="talk_Q_ta" src={q_ta} alt="bookIcon" />
              <p className="board PhoneText">
                使ってくれてありがとう
                <p>{time3}</p>
              </p>
            </div>
            {array.map((time) => {
              return (
                <div className="board SendText">
                  「わからない」を送信しました！
                  <p>{time}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="PhoneBtnFrame">
          <Button
            id="PhoneWhatBtn"
            onClick={() => {
              handleWhat();
            }}
          >
            わからない
          </Button>
        </div>
      </div>
    </>
  );
}

export default Phone;
