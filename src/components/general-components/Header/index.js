import { Link, useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/img/header-logo.png";
import { useDispatch } from "react-redux";
import { changeFind } from "./findSlice";

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
  const [findWord, setfindWord] = useState("");
  const location = useLocation();
  const history = useHistory();

  // store state
  const dispatch = useDispatch();

  const handlerBehavior = (event) => {
    if (!showForm) {
      setshowForm(!showForm);
      return;
    }
    if (findWord !== "") {
      handlerFind();
      return;
    }
    setshowForm(!showForm);
  };

  const handlerFind = () => {
    if (location !== "/catalog") {
      history.push("/catalog");
    }
    dispatch(changeFind(findWord));
  };

  const handlerSubmitFind = (event) => {
    event.preventDefault();
    handlerFind();
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
                    onClick={handlerBehavior}
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
                  onSubmit={handlerSubmitFind}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    value={findWord}
                    onInput={(event) => setfindWord(event.target.value)}
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
