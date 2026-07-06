import { showSettingM } from "../atom";

function SettingModal({ SettingModalSetState, SettingM }) {
  if (!showSettingM) return null;
  function handleClose() {
    SettingModalSetState(!SettingModal);
  }
  function handleSave() {
    console.log("save");
  }
  function handleCreate() {
    console.log("create");
  }

  return (
    <>
      <div className="border">
        <button onClick={handleClose}>X</button>
        <h1>ユーザー設定画面</h1>
        <div onClick={handleSave}>・メールアドレス変更</div>
        <div onClick={handleCreate}>・表示名変更</div>
        <div onClick={handleCreate}>・ロール切り替え</div>
      </div>
    </>
  );
}
export default SettingModal;
