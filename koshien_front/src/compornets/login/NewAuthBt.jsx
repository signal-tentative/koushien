import "./LoginApp.css";
import { atomNewForm } from "./atoms";
import { useSetAtom } from "jotai";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { atomEmail, atomPass } from "./atoms";

export function NewAuthBt() {
  const setNewForm = useSetAtom(atomNewForm);

  const createAccount = async () => {
    // setNewForm(true);
    // console.log("新規作成click");
    // const reqSignUp = await fetch("/api/firebase/signUp", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: atomEmail || "", pass: atomPass || "" }),
    // });
    // if (reqSignUp.ok) {
    //   // setUserForm(true);
    //   console.log("ok");
    // } else {
    //   const json = await reqSignUp.json();
    //   console.log(json);
    //   alert(json.message);
    // }
  };

  return (
    <Button
      id="left_button"
      onClick={() => {
        createAccount();
      }}
      variant="contained"
      endIcon={<GroupAddIcon />}
    >
      新規登録
    </Button>
  );
}
