import { useState } from "react";

function Lecturelist() {
  const [count, setCount] = useState(0);

  const data = [{ name: "講義A" }, { name: "講義B" }, { name: "講義C" }];

  return (
    <>
      <list>
        {data.map((ele) => {
          return <div>{ele.name}</div>;
        })}
      </list>
    </>
  );
}

export default Lecturelist;
