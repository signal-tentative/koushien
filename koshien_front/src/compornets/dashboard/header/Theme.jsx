import Logo from "/public/Logo.png";
import Logo3 from "/public/Logo3.png";
export function Theme({ userMode }) {
  return (
    <div id="theme">
      {!userMode ? (
        <img id="header-img" src={Logo3} style={{ height: "95%" }} />
      ) : (
        <img id="header-img" src={Logo} style={{ height: "95%" }} />
      )}
    </div>
  );
}
