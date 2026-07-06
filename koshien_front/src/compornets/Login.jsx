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
      <div style={{ flex: "column" }}>
        <div id="loginTitle">
          <img id="qta-maru" src={qtaImage} alt="qta" />
          <div id="loginTitleText">まなびのシグナル</div>
        </div>
        <div className="boad">
          <div style={{ display: "flex" }}></div>
          <div>
            <h2 style={{ color: "black" }}>ログイン</h2>
          </div>
          <div>
            アドレス
            <input type="text" placeholder="example@toyota.co.jp" />
          </div>
          <div>
            <div>Password</div>

            <input type="password" placeholder="password" />
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
