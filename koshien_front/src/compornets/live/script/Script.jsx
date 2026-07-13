import { useState } from "react";

function Script() {
  const [script, setScript] = useState("");
  const handleScript = (e) => {
    setScript(e.target.value);
    console.log(script);
  };

  return (
    <>
      <div id="ScriptTitle">🗣️ スクリプト</div>
      <div className="text">
        <div>
          <input
            className="text"
            id="ScriptBoard"
            type="text"
            value={script}
            onChange={handleScript}
          />
        </div>
      </div>
    </>
  );
}

export default Script;
