import { showCreateLectureM } from "../atom";
import FileSelectURL from "../FileSelectURL";

function CreateLectureModal({ CreateLectureModalSetState }) {
  function handleClose() {
    CreateLectureModalSetState(!showCreateLectureM);
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
        <h1>新規作成</h1>
        <input placeholder="講義タイトルを入力"></input>
        <textarea placeholder="講義概要を入力"></textarea>
        <FileSelectURL />
        <button onClick={handleSave}>一時保存</button>
        <button onClick={handleCreate}>講義を作成</button>
      </div>
    </>
  );
}
export default CreateLectureModal;
