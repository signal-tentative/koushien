import { useEffect, useState } from "react";

function Script({ lecture_id }) {
  const [script, setScript] = useState([]);
  const document_id = Number(lecture_id);
  useEffect(() => {
    const res = fetch(`${import.meta.env.VITE_API_URL}/scripts/${document_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setScript(data.map((da) => da.script));
      });
    console.log(script);
  }, []);

  return (
    <>
      <div id="ScriptTitle">🗣️ スクリプト</div>
      <div className="text">
        <div>
          <input className="text" id="ScriptBoard" type="text" value={script} />
        </div>
      </div>
    </>
  );
}

export default Script;
