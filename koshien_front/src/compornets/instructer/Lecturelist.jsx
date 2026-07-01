import { useState } from "react";

function Lecturelist() {
  const data = [
    { name: "講義A", date: "7/12", lectureId: "1" },
    { name: "講義B", date: "7/13", lectureId: "2" },
    { name: "講義C", date: "7/14", lectureId: "3" },
  ];

  return (
    <>
      <list>
        {data.map((ele) => {
          return (
            <div>
              {ele.name}
              {ele.date}
              {ele.lectureId}
            </div>
          );
        })}
      </list>
    </>
  );
}

export default Lecturelist;
