function SettingModal({ SettingModalSetState, SettingM }) {
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
        <h1>ユーザー設定画面</h1>
        <button onClick={handleClose}>X</button>
        <div onClick={handleSave}>・メールアドレス変更</div>
        <div onClick={handleCreate}>・表示名変更</div>
        <div onClick={handleCreate}>・ロール切り替え</div>
      </div>
    </>
  );
}
export default SettingModal;
