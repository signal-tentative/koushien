import { useAtomValue } from "jotai";
import { atomEmail, atomPass } from "./atoms";
import { useNavigate } from "react-router";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import "./LoginApp.css";

export function SignInBt() {
  const email = useAtomValue(atomEmail);
  const pass = useAtomValue(atomPass);
  const nav = useNavigate();
  const signIn = async () => {
    // shiyunichi_furuse@mail.toyota.co.jp
    const reqSignIn = await fetch("/api/firebase/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email || "", pass: pass || "" }),
    });
    if (reqSignIn.ok) {
      nav("/main");
    } else {
      const json = await reqSignIn.json();
      if (json.message === "すでにログインされています") {
        nav("/main");
      }
      alert(json.message);
    }
  };
  return (
    <Button
      id="right_button"
      variant="contained"
      endIcon={<SendIcon />}
      onClick={signIn}
    >
      認証
    </Button>
  );
}
