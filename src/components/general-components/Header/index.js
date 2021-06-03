import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/img/header-logo.png";
import "../../../global.css";

const Header = () => {
  const [links, setlinks] = useState([
    {
      text: "Главная",
      url: "/",
    },
    {
      text: "Каталог",
      url: "/catalog",
    },
    {
      text: "О магазине",
      url: "/about",
    },
    {
      text: "Контакты",
      url: "/contacts",
    },
  ]);

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                {links.map((element, index) => (
                  <Link key={index} to={element.url}>
                    <li className="nav-item">{element.text}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
