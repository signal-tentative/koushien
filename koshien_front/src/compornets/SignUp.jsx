import { useState } from "react";
import { useNavigate } from "react-router";
function SignUp() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const handleCreateAccount = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <h1>アカウント作成</h1>
        <div>
          <div style={{ display: "flex" }}></div>
          <div>
            メールアドレス:
            <input type="text" />
          </div>
          <div>
            Password:
            <input type="password" />
          </div>
          <div>
            Password（再入力）:
            <input type="password" />
          </div>
          <div>
            <button onClick={handleCreateAccount}>新規作成</button>
          </div>
          <div>
            <input type="checkbox" />
            利用規約への云々
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
