function CreateLectureModal({ CreateLectureModalSetState, CreateLectureM }) {
  function handleClose() {
    CreateLectureModalSetState(!CreateLectureModal);
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
        <h1>新規作成</h1>
        <button onClick={handleClose}>X</button>
        <input placeholder="講義タイトルを入力"></input>
        <textarea placeholder="講義概要を入力"></textarea>
        <input type="file"></input>
        <button onClick={handleSave}>一時保存</button>
        <button onClick={handleCreate}>講義を作成</button>
      </div>
    </>
  );
}
export default CreateLectureModal;
