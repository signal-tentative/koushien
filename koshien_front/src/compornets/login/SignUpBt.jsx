import { useAtomValue } from "jotai";
import { atomEmail, atomPass } from "./atoms";
import { useNavigate } from "react-router";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

export function SignUpBt() {
  const email = useAtomValue(atomEmail);
  const pass = useAtomValue(atomPass);
  const nav = useNavigate();

  const signUp = async () => {
    const reqSignUp = await fetch("/api/firebase/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email || "", pass: pass || "" }),
    });
    if (reqSignUp.ok) {
      nav("/main");
      // return (
      //   <div>
      //     アカウントが作成されました。
      //     ログイン画面から再度ログインをお願いします。
      //     <button className="loginBtn">ログイン</button>
      //   </div>
      // );
    } else {
      const json = await reqSignUp.json();
      console.log(json);
      alert(json.message);
    }
  };
  return (
    <Button
      id="right_button"
      variant="contained"
      endIcon={<SendIcon />}
      onClick={signUp}
    >
      認証
    </Button>
  );
}

//-------
import { useState } from "react";
import qtaImage from "/public/Signal-2.png";

function Login() {
  const navigate = useNavigate();
  const handleLoginI = () => {
    navigate("/dashboard");
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
            <div>
              <h2>新規作成</h2>
              <h4>アカウントを作成しましょう。</h4>
            </div>
            <div>名前</div>
            <input type="text" placeholder="名前" />
          </div>
          <div>メールアドレス</div>
          <input type="password" placeholder="example@toyota.co.jp" />
        </div>

        <div>
          <div>パスワード</div>
          <input type="password" placeholder="8文字以上" />
        </div>
        <div>
          <div>
            <div>パスワード(確認用)</div>
            <input type="password" placeholder="もう一度入力" />
          </div>
          <div>
            <button className="whiteBtn" onClick={handleCreate}>
              アカウントを作成
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
