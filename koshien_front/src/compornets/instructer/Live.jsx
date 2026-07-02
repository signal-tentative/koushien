import { divide } from "firebase/firestore/pipelines";
import { useState } from "react";

function Live() {
  function handleEnd() {
    console.log("End");
  }
  return (
    <>
      <div>
        <div>スライドコンポーネント</div>
        <div>スクリプト</div>
      </div>
      <div>わからないぐらふコンポーネント</div>
      <button onClick={handleEnd}>講義を終了する</button>
    </>
  );
}

export default Live;
