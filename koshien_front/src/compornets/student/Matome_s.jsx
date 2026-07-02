function Matome_s({ MatomeModalSetState, MatomeM, PushData }) {
  console.log(PushData);
  function handleClose() {
    MatomeModalSetState(!MatomeM);
  }

  return (
    <>
      <div className="border">
        <h2>講義の詳細</h2>
        <div>{PushData.lectureId}</div>
        <div>講義ID:{PushData.date}</div>
        <div>ダウンロード</div>
        <div>資料リンク</div>
        <div>主なわからないポイントまとめ</div>
        <div>壁打ち結果から見える理解度サマリー</div>
        <div>次回に向けたAIからの修正案</div>
      </div>
    </>
  );
}
export default Matome_s;
