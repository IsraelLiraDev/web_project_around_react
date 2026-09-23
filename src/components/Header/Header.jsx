import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="logo header__logo"
      />
    </header>
  );
}

export default Header;