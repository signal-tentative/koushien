import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import "./sign-up.css";
import qtaImage from "/public/Signal-2.png";
import { useNavigate } from "react-router";
import { Icon } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (String(password) !== String(password2)) {
      return alert("再入力パスワードと一致しません");
    }
    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      console.log("Firebaseに登録成功:", user.uid);
      const token = await user.getIdToken();

      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: userName,
          permission: true,
        }),
      })
        .then((resolve) => {
          return resolve.json();
        })
        .then((json) => {
          localStorage.setItem("user_uid", json.uid);
        });

      nav("/dashman");
    } catch (error) {
      console.error("登録エラー:", error.message);
      alert(`登録失敗: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="up-title">
        <img id="qta-maru-u" src={qtaImage} alt="qta" />
        <div id="login-title-text-u">まなびのシグナル</div>
      </div>
      <div style={{ flex: "column" }}>
        <form className="board-signup" onSubmit={handleRegister}>
          <div
            onClick={() => {
              nav(-1);
            }}
            className="back-div"
          >
            <ArrowBackIosIcon className="back-icon" />
            <b className="back-text">戻る</b>
          </div>
          <div className="createboad">
            <b style={{ color: "black", fontSize: 23 }}>新規作成</b>
            <br />
            <b
              style={{
                color: "black",
                fontSize: 14,
                fontWeight: 400,
                fontFamily: "Zen Kaku Gothic Antique",
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "20px",

                color: "#2A5568",
              }}
            >
              アカウントを作成しましょう。
            </b>
            <div>
              <p className="input-title-u">名前</p>
              <input
                type="text"
                placeholder="名前"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <p className="input-title-u">メールアドレス</p>
            <input
              type="email"
              placeholder="example@toyota.co.jp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <p className="input-title-u">パスワード</p>
              <input
                type="password"
                placeholder="8文字以上"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <div>
                <p className="input-title-u">パスワード(確認用)</p>
                <input
                  type="password"
                  placeholder="確認用"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  className="create-acount-btn-u"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "登録中..." : "アカウント作成"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
