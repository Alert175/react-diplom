import { Link, useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/img/header-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { changeFind, selectFind } from "./findSlice";

const Header = () => {
  // eslint-disable-next-line
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
  const [showForm, setshowForm] = useState(false);
  const location = useLocation();
  const history = useHistory();

  // store state
  const findValue = useSelector(selectFind);
  const dispatch = useDispatch();

  const handlerFind = (event) => {
    if (location !== "/catalog") {
      history.push("/catalog");
    }
    dispatch(changeFind(event.target.value));
  };

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
                  <li
                    key={index}
                    to={element.url}
                    className={`nav-item ${
                      location.pathname === element.url ? "active" : ""
                    }`}
                  >
                    <Link to={element.url} className="nav-link">
                      {element.text}
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    onClick={() => setshowForm(!showForm)}
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                  ></div>
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${
                    !showForm ? "invisible" : ""
                  }`}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    value={findValue}
                    onInput={handlerFind}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
