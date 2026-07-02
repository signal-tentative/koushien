import { showMatomeM } from "../atom";

function Matome({ MatomeModalSetState, PushData }) {
  function handleClose() {
    MatomeModalSetState(!showMatomeM);
  }

  return (
    <>
      <div className="border">
        <button onClick={handleClose}>X</button>
        <h2>講義の詳細({PushData.name})</h2>
        <div>講義ID:{PushData.lectureId}</div>
        <div>{PushData.date}</div>
        <div>ダウンロード</div>
        <div>資料リンク</div>
        <div>主なわからないポイントまとめ</div>
        <div>壁打ち結果から見える理解度サマリー</div>
        <div>次回に向けたAIからの修正案</div>
      </div>
    </>
  );
}
export default Matome;
