import "./Message.css";

function Message() {
  return (
    <>
      <div className="message_container">
        <img src="Q_ta.png" alt="アイコン" id="icon"></img>
        <div className="message">
          <p id="message_text">
            まずは今日の通知を確認しよう。課題が多く忙しい1日ですね。今日も頑張ろう！
          </p>
        </div>
      </div>
    </>
  );
}

export default Message;
