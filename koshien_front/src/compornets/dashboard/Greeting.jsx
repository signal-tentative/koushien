import { useEffect, useState } from "react";
import Live from "../live/Live";
import { data, useNavigate } from "react-router";
import { join } from "firebase/firestore/pipelines";
import { atomUserMode } from "./atoms";
import { useAtomValue } from "jotai";

function Greeting() {
  const navigate = useNavigate();
  const [name, setName] = useState("マエケン");
  const uid = localStorage.getItem("user_uid");
  const userMode = useAtomValue(atomUserMode);

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
    window.open(`${import.meta.env.VITE_API_URL}/slide`, "_blank");
    navigate("/live");
  }

  return (
    <>
      <div className="greetFrame">
        <div id="greet">こんにちは {name}さん</div>
        {/* <button onClick={() => handleStart()}>START</button> */}
        {userMode ? (
          <div id="fight">今日も学びを楽しみましょう！</div>
        ) : (
          <div id="fight">
            今日も素晴らしい講義を！
            <br />
            受講生が待っています
          </div>
        )}
      </div>
    </>
  );
}
export default Greeting;
