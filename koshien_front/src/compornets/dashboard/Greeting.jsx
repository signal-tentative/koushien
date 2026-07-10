import { useEffect, useState } from "react";
import Live from "../live/Live";
import { data, useNavigate } from "react-router";
import { join } from "firebase/firestore/pipelines";

function Greeting() {
  const navigate = useNavigate();
  const [name, setName] = useState("マエケン");
  const uid = localStorage.getItem("user_uid");

  useEffect(() => {
    const user = fetch(`${import.meta.env.VITE_API_URL}/users/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
      });
  }, []);

  function handleStart() {
    console.log("start");
    window.open("http://localhost:5173/slide", "_blank");
    navigate("/live");
  }

  return (
    <>
      <div className="left">
        <div id="greet">こんにちは {name}さん</div>
        <button onClick={() => handleStart()}>START</button>
        <div id="fight">今日も学びを楽しみましょう！</div>
      </div>
    </>
  );
}
export default Greeting;
