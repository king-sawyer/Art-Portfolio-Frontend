import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      <div className="HeaderLinks">
        <ul className="headerUl">
          <li className="headerLi">
            <Link to="/">HOME</Link>
          </li>
          <li className="headerLi">
            <Link to="/shop">SHOP</Link>
          </li>
          <li className="headerLi">
            <Link to="/art">ART</Link>
          </li>
          <li className="headerLi">
            <Link to="/about">ABOUT</Link>
          </li>
          <li className="headerLi">
            <Link to="/contact">CONTACT</Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default Header;
