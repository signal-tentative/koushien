import { useState } from "react";
import { useNavigate } from "react-router";
function Login() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const handleLoginI = () => {
    navigate("/dashboard");
  };
  const handleLoginS = () => {
    navigate("/dashboard");
  };
  const handleCreate = () => {
    navigate("create");
  };

  return (
    <>
      <div>
        <h1>ログイン画面</h1>
        <div>
          <div style={{ display: "flex" }}></div>
          <div>
            アドレス:
            <input type="text" />
          </div>
          <div>
            Password:
            <input type="password" />
          </div>
          <div>
            <button onClick={handleLoginI}>講師ログイン</button>
          </div>
          <div>
            <button onClick={handleLoginS}>受講生ログイン</button>
          </div>
          <div>
            <button onClick={handleCreate}>アカウント作成</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
