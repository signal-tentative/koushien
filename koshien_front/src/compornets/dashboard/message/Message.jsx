import "./Message.css";
import { atomUserMode } from "../atoms";
import { useAtomValue } from "jotai";

function Message() {
  const userMode = useAtomValue(atomUserMode);
  return (
    <>
      <div className="message_container">
        <img src="Q_ta.png" alt="アイコン" id="icon"></img>
        <div className="fukidasi">
          {userMode ? (
            <p id="message_text">
              お疲れ様です。
              <br /> 今日は講義が多くてちょっと忙しい一日ですね。
              <br />
              終わってから忘れてしまわないように、隙間時間に振り返りをしていきましょう！
            </p>
          ) : (
            <p id="message_text">
              お疲れ様です。
              <br /> 今日は講義が多くてちょっと忙しい一日ですね。
              <br />
              事前準備に抜け漏れはありませんか？
              受講生が待っています。張り切っていきましょう!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Message;
