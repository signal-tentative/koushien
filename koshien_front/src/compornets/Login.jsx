import { useState } from "react";
import { useNavigate } from "react-router";
import LoginApp from "./login/LoginApp";
import qtaImage from "/public/Signal-2.png";
import { app, auth } from "../../firebase/firebase.config";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  // 認証する利用者IDの入力の値を管理するstate
  const [certId, setCertId] = useState("");
  // 認証するパスワード利用者IDの入力の値を管理するstate
  const [certPw, setCertPw] = useState("");
  // これで 'auth' オブジェクトを使って認証機能を利用できます

  console.log("Firebase Authサービスが取得されました:", auth);
  const handleSetupSubmit = (e) => {
    e.preventDefault();
    if (certId === null || certId === "") {
      alert("入力要件が合致していません。");
    } else {
      console.log(" id=" + certId + " pw=" + certPw);
      console.log("ここにFirebaseへの利用者認証を行うロジックを入れる");
      let user = "";
      let token = "";

      signInWithEmailAndPassword(auth, certId, certPw)
        .then((userCredential) => {
          // ログインが成功した場合
          user = userCredential.user;
          console.log("firebaseログイン成功:", user);
          localStorage.setItem("user_id", user.uid);
          token = user.getIdToken();
        })
        .then(() => {
          const response = fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              uid: user.uid,
              email: user.email,
              name: "FrontTestUser1",
              permission: false,
            }),
          });
          console.log("アプリログイン成功:", user);
          navigate("/dashboard");
        })
        .catch((error) => {
          // エラーが発生した場合
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("ログインエラー:", errorCode, errorMessage);
          // エラーコードに基づいてエラーハンドリングを行う
        });
    }
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
            <input
              type="text"
              placeholder="example@toyota.co.jp"
              onChange={(e) => setCertId(e.target.value)}
            />
          </div>
          <div>
            <div>Password</div>

            <input
              type="password"
              required
              placeholder="password"
              onChange={(e) => setCertPw(e.target.value)}
            />
          </div>
          <div>
            <button className="loginBtn" onClick={handleSetupSubmit}>
              講師ログイン
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
