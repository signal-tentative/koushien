import Live from "../live/Live";
import { useNavigate } from "react-router";

function Greeting() {
  const navigate = useNavigate();
  function handleStart() {
    console.log("start");
    window.open("http://localhost:5173/slide", "_blank");
    navigate("/live");
  }

  return (
    <>
      <div className="greetFrame">
        <div id="greet">こんにちは 前田 健太さん</div>
        <button onClick={() => handleStart()}>START</button>
        <div id="fight">今日も学びを楽しみましょう！</div>
      </div>
    </>
  );
}
export default Greeting;
