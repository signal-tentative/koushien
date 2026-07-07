import { useState } from "react";
import { useNavigate } from "react-router";
import LoginApp from "./login/LoginApp";
import qtaImage from "/public/Signal-2.png";
import errorMark from "/public/Signal-2.png";
import { app, auth } from "../../firebase/firebase.config";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { width } from "@mui/system";

function Login() {
  const navigate = useNavigate();
  const [certId, setCertId] = useState("");
  const [certPw, setCertPw] = useState("");
  const [emailjotai, setemailjotai] = useState("default");
  const [pwjotai, setpwjotai] = useState("default");
  const [loginjotai, setloginjotai] = useState("default");
  const [beforeEmailPw, setbeforeEmailPw] = useState("");

  if (loginjotai == "default") {
    if (certId && certPw) {
      setloginjotai("ready");
    }
  }

  if (loginjotai == "ready") {
    if (!certId || !certPw) {
      setloginjotai("default");
    }
  }
  if (loginjotai == "error") {
    console.log(beforeEmailPw);
    if (certId + certPw !== beforeEmailPw) {
      setloginjotai("ready");
    }
  }

  console.log("Firebase Authサービスが取得されました:", auth);
  const handleSetupSubmit = (e) => {
    e.preventDefault();
    if (certId === null || certId === "") {
      alert("入力要件が合致していません。");
      setemailjotai("error");
      setpwjotai("error");
      setloginjotai("error");
      setbeforeEmailPw(certId + certPw);
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
          setemailjotai("error");
          setpwjotai("error");
          setloginjotai("error");
          const errorCode = error.code;
          const errorMessage = error.message;
          setbeforeEmailPw(certId + certPw);
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
        <div className="board">
          <div style={{ display: "flex" }}></div>
          <div>
            <b style={{ color: "black", fontSize: 23 }}>ログイン</b>
          </div>

          {emailjotai == "default" ? (
            <div className="inputAdress">
              <div className="inputTitle">メールアドレス</div>
              <input
                className="inputBox"
                type="text"
                placeholder="example@toyota.co.jp"
                onChange={(e) => setCertId(e.target.value)}
              />
            </div>
          ) : (
            <div className="inputContener">
              <div className="inputTitle" style={{ color: "red" }}>
                メールアドレス
              </div>
              <input
                className="errorinput"
                type="text"
                placeholder="example@toyota.co.jp"
                onChange={(e) => setCertId(e.target.value)}
              />
              <img className="errorMark" src={errorMark} alt="qta" />
            </div>
          )}

          {pwjotai == "default" ? (
            <div>
              <div className="inputTitle">パスワード</div>

              <input
                className="inputBox"
                type="password"
                required
                placeholder="password"
                onChange={(e) => setCertPw(e.target.value)}
              />
            </div>
          ) : (
            <div className="inputContener">
              <div className="inputTitle" style={{ color: "red" }}>
                パスワード
              </div>

              <input
                className="errorinput"
                type="password"
                required
                placeholder="password"
                onChange={(e) => setCertPw(e.target.value)}
              />
              <img className="errorMark" src={errorMark} alt="qta" />
            </div>
          )}

          {loginjotai == "ready" ? (
            <div>
              <button className="readyloginBtn" onClick={handleSetupSubmit}>
                <div className="whiteText">ログイン</div>
              </button>
            </div>
          ) : loginjotai == "default" ? (
            <div>
              <button className="defaultloginBtn" onClick={handleSetupSubmit}>
                <div className="whiteText">ログイン</div>
              </button>
            </div>
          ) : (
            <div className="errorloginBox">
              <button className="errorloginBtn" onClick={handleSetupSubmit}>
                <div className="redText">ログイン</div>
              </button>
              <div className="redText" style={{ fontWeight: 300 }}>
                アドレスまたはパスワードが間違っています
              </div>
            </div>
          )}

          <div>
            <button className="createAcountBtn" onClick={handleCreate}>
              <div className="blueText">アカウント新規作成</div>
            </button>
          </div>
        </div>
      </div>
      {/* <LoginApp /> */}
    </>
  );
}

export default Login;
