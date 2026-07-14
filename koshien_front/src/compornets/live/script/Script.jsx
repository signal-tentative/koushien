import { useEffect, useState } from "react";

function Script() {
  const [script, setScript] = useState([]);

  useEffect(() => {
    const res = fetch(`${import.meta.env.VITE_API_URL}/scripts`)
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
