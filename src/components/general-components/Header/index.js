import {Link, useLocation, useHistory} from "react-router-dom";
import {useState} from "react";
import logo from "../../../assets/img/header-logo.png";
import {useDispatch, useSelector} from "react-redux";
import {changeFind} from "./findSlice";
import {selectProducts} from "../../cart-components/Basket/basketSlice";

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
    const productsByBasket = useSelector(selectProducts);

    const handlerBehavior = (event) => {
        if (findWord !== "") {
            handlerFind();
        }
        setshowForm(!showForm);
    };

    const handlerFind = () => {
        if (location !== "/catalog") {
            history.push("/catalog#find");
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
                            <img src={logo} alt="Bosa Noga"/>
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
                                        <Link onClick={() => {
                                            dispatch(changeFind(''))
                                            setfindWord('')
                                        }} to={element.url} className="nav-link">
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
                                    <div
                                        className="header-controls-pic header-controls-cart"
                                        onClick={() => history.push("/cart")}
                                    >
                                        {productsByBasket.length > 0 && (
                                            <div className="header-controls-cart-full">
                                                {productsByBasket.length}
                                            </div>
                                        )}
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
