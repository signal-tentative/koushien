import { useState } from "react";
import { useNavigate } from "react-router";
import LoginApp from "./login/LoginApp";

function Login() {
  const navigate = useNavigate();
  const handleLoginI = () => {
    navigate("/dashboard");
  };
  const handleLoginS = () => {
    navigate("/dashboard_s");
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
          <LoginApp />
        </div>
      </div>
    </>
  );
}

export default Login;
