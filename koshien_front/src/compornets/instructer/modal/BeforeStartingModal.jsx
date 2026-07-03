import { useState } from "react";
import { useNavigate } from "react-router";
import { showBeforeStarting } from "../atom";

function BeforeStartingModal({ BeforeStartingModalSetState, SPushData }) {
  const navigate = useNavigate();
  console.log(SPushData);
  function handleClose() {
    BeforeStartingModalSetState(!showBeforeStarting);
  }
  function handleDelete() {
    console.log("delete");
  }
  function handleEdit() {
    console.log("Edit");
  }
  function handleStart() {
    console.log("start");
    navigate("/live");
  }

  return (
    <>
      <div className="border">
        <button onClick={handleClose}>X</button>
        <div>{SPushData.name}</div>
        <div>講義を共有🔗</div>
        <div>概要</div>
        <button onClick={() => handleDelete()}>削除ボタン</button>
        <button onClick={() => handleEdit()}>
          編集ボタンで入力エリア活性化
        </button>
        <button onClick={() => handleStart()}>講義開始ボタン</button>
      </div>
    </>
  );
}
export default BeforeStartingModal;
