import "./LoginApp.css";
import { atomNewForm } from "./atoms";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { BackBt } from "./BackBt";
import { InputEmail } from "./InputEmail";
import { InputPass } from "./InputPass";
import { NewAuthBt } from "./NewAuthBt";
import { SignInBt } from "./SignInBt";
import { SignUpBt } from "./SignUpBt";

export function LoginApp() {
  const newForm = useAtomValue(atomNewForm);
  const nav = useNavigate();
  useEffect(() => {
    // サインインされていれば
    (async () => {
      const authReq = await fetch("/api/firebase/authUser");
      const json = await authReq.json();
      if (json.status) {
        nav(`/main`);
      }
    })();
  }, []);

  return (
    <>
      <div className="app-container">
        <p id="title">Stock Control</p>
        <p id="user">サインイン</p>
        <p id="user_id">利用者IDを入力してください（メールアドレス）</p>
        <InputEmail />
        <p id="pass">パスワードを入力してください（英数字８桁以上）</p>
        <InputPass id="pass" />

        {newForm ? (
          <div>
            <BackBt />
            <SignUpBt />
          </div>
        ) : (
          <div>
            <NewAuthBt />
            <SignInBt />
          </div>
        )}
      </div>
    </>
  );
}
