function EndLecturelist() {
  const data = [{ name: "講義D" }, { name: "講義E" }, { name: "講義F" }];

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

export default EndLecturelist;
