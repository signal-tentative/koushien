import "./Message.css";

function Message() {
  return (
    <>
      <div className="message_container">
        <img src="Q_ta.png" alt="アイコン" id="icon"></img>
        <div className="fukidasi">
          <p id="message_text">
            お疲れ様です。 今日は講義が多くてちょっと忙しい一日ですね。
            事前準備に抜け漏れはありませんか？受講生が待っています。張り切っていきましょう！
          </p>
        </div>
      </div>
    </>
  );
}

export default Message;
