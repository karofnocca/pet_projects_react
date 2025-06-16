import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-200">
      <h1 className="text-4xl">Header</h1>

      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      <NavLink to={"/cart"}>Cart</NavLink>
      <hr />
    </header>
  );
}

export default Header;
