import { useState } from "react";
import Lecturelist from "./Lecturelist";
import EndLecturelist from "./EndLecturelist";
function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <button>🔔</button>
        <button>⚙️</button>
        <button>🙍‍♂️</button>
        <h1>講義ダッシュボード</h1>
        <button>講義の新規登録</button>
        <div>
          <div>
            <h2>講義リスト(予定)</h2>
            <Lecturelist />
          </div>
          <div>
            <h2>実装済講義リスト</h2>
            <EndLecturelist />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
