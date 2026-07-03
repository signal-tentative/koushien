import { useState } from "react";
import { useNavigate } from "react-router";
import LoginApp from "./login/LoginApp";
import qtaImage from "/public/Signal-2.png";

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
      <div id="display">
        <img id="qta-maru" src={qtaImage} alt="qta" />
        <div className="boad">
          <div style={{ display: "flex" }}></div>
          <h1>Login</h1>
          <div>
            アドレス:
            <input type="text" />
          </div>
          <div>
            Password:
            <input type="password" />
          </div>
          <div>
            <button className="loginBtn" onClick={handleLoginI}>
              講師ログイン
            </button>
          </div>
          <div>
            <button className="loginBtn" onClick={handleLoginS}>
              受講生ログイン
            </button>
          </div>
          <div>
            <button className="whiteBtn" onClick={handleCreate}>
              アカウント新規作成
            </button>
          </div>
        </div>
      </div>
      {/* <LoginApp /> */}
    </>
  );
}

export default Login;
