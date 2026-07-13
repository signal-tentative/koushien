import { useState } from "react";
import { useAtom } from "jotai";

import { Header } from "./header/Header";
import Greeting from "./Greeting";
import Schedule from "./Schedule/Schedule";
import Recording from "../Recording";
import ScheduleRight from "./Schedule/ScheduleRight";
import Message from "./message/Message";

import "./dashbord.css";

function DashBoard() {
  //現在のログイン状態を監視したい

  //leftboxに対してのデータ処理
  // const [leftData,setLeftData] = useState([{}])
  // useEffect(
  //   fetch()
  //   .then(res=>res.json())
  //   .then(json=>setLeftData(json))
  //   ,[])
  return (
    <>
      <Header />
      <div className="between">
        <Greeting />
        <Message />
      </div>
      <Schedule title="受講中〜" data />
      <ScheduleRight />
    </>
  );
}
export default DashBoard;
