import "./header.css";
import { Theme } from "./Theme";
import { atomUserMode } from "../atoms";
import { useAtom } from "jotai";

export function Header() {
  const [userMode, setUserMode] = useAtom(atomUserMode);
  // userMode如何でCSSの適応を変更する

  return (
    <div className="header">
      <Theme />
      <div>
        <button
          onClick={() => {
            setUserMode(!userMode);
          }}
        >
          {userMode ? "受講生" : "講師"}
        </button>
        <button
          onClick={() => {
            // モーダルを表示する必要がある
          }}
        >
          設定ボタン
        </button>
        <button
          onClick={() => {
            //ログアウトのfecth
          }}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
