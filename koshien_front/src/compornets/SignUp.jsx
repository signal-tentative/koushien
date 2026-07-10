import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase.config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

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
      });

      if (response.ok) {
        alert("ユーザー登録とDB保存が完了しました！");
      } else {
        alert("Firebase登録はできましたが、サーバー側の保存に失敗しました");
      }
    } catch (error) {
      console.error("登録エラー:", error.message);
      alert(`登録失敗: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ flex: "column" }}>
        <form
          onSubmit={handleRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px",
          }}
        >
          <div id="loginTitle">
            {/* <img id="qta-maru" src={qtaImage} alt="qta" /> */}
            <div id="loginTitleText">まなびのシグナル</div>
          </div>
          <div className="createboad">
            <div style={{ display: "flex" }}></div>
            <div>
              <div>
                <h2>新規作成</h2>
                <h4>アカウントを作成しましょう。</h4>
              </div>
              <div>名前</div>
              <input
                type="text"
                placeholder="名前"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>メールアドレス</div>
            <input
              type="email"
              placeholder="example@toyota.co.jp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <div>パスワード</div>
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
                <div>パスワード(確認用)</div>
                <input
                  type="password"
                  placeholder="確認用"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" disabled={loading}>
                  {loading ? "登録中..." : "アカウント作成"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
  {
    /* 
       
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        <h2>ユーザー登録</h2>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "登録中..." : "アカウント作成"}
        </button> */
  }
};
export default SignUp;
