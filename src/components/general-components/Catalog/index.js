import useFetch from "../../../hooks/useFetch";
import Loader from "./loader";
import ProductCard from "../../home-components/productCard";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Catalog = ({ isFind }) => {
  // config state
  const [activeCategorie, setactiveCategorie] = useState(0);
  const [queryItemCategorie, setqueryItemCategorie] = useState(0);

  // find state
  const [findWord, setfindWord] = useState("");

  // offset state
  const [queryOffset, setqueryOffset] = useState(0);
  const [isShowMore, setisShowMore] = useState(true);
  const [isLoadMoreItems, setisLoadMoreItems] = useState(false);

  // items state
  const [items, setitems] = useState(null);
  const [isLoadItems, setisLoadItems] = useState(false);
  const [errItems, seterrItems] = useState(null);

  const [categories, isLoadCategories, errCategories] = useFetch(
    "http://localhost:7070/api/categories",
    {}
  );

  // request items for server
  const getItems = async (categoryId = 0, offset = 0) => {
    try {
      setisLoadItems(true);
      setitems(null);
      const response = await axios.get("http://localhost:7070/api/items", {
        params: {
          categoryId,
          offset,
        },
      });
      setisLoadItems(false);
      setitems(response.data);
      if (response.data.length < 6) {
        setisShowMore(false);
      }
    } catch (err) {
      console.error(err);
      setisLoadItems(false);
      seterrItems(err.response.status);
    }
  };

  // request find for input word
  const getItemsFormWord = () => {
    try {
      setitems([]);
      //
    } catch (error) {
      console.error(error);
      setisLoadItems(false);
      setitems([]);
    }
  };

  // change find state
  const handlerChangeFindWord = (event) => {
    console.log("submit");
    event.preventDefault();
  };

  // select categories
  const handleChangeCategorie = (event, id) => {
    event.preventDefault();
    if (activeCategorie !== id && queryItemCategorie !== id) {
      setactiveCategorie(id);
      setqueryItemCategorie(id);
      setqueryOffset(0);
      getItems(id, 0);
    }
  };

  // handler more items
  const handlerLoadMore = async () => {
    const counterOffset = queryOffset + 6;
    setqueryOffset((prev) => (prev += 6));
    try {
      setisLoadMoreItems(true);
      const response = await axios.get("http://localhost:7070/api/items", {
        params: {
          activeCategorie,
          offset: counterOffset,
        },
      });
      setisLoadMoreItems(false);
      setitems([...items, ...response.data]);
      if (response.data.length < 6) {
        setisShowMore(false);
      }
    } catch (err) {
      console.error(err);
      setisLoadMoreItems(false);
      seterrItems(err.response.status);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  if (errCategories !== null || errItems !== null) {
    return null;
  }

  // internal components for find keyword
  const FindKeyWords = () => {
    if (isFind) {
      return (
        <form
          className="catalog-search-form form-inline"
          onSubmit={(event) => handlerChangeFindWord(event)}
        >
          <input
            className="form-control"
            placeholder="Поиск"
            value={findWord}
            onInput={(event) => setfindWord(event.target.value)}
          />
        </form>
      );
    }
    return null;
  };

  // internal component for categories
  const Categories = () => {
    if (isLoadCategories) {
      return <Loader />;
    }
    if (categories !== null) {
      return (
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            {/* eslint-disable-next-line */}
            <a
              className={`nav-link ${activeCategorie === 0 ? "active" : ""}`}
              onClick={(event) => handleChangeCategorie(event, 0)}
              href="#"
            >
              Все
            </a>
          </li>
          {categories.map((element) => (
            <li key={element.id} className="nav-item">
              {/* eslint-disable-next-line */}
              <a
                className={`nav-link ${
                  activeCategorie === element.id ? "active" : ""
                }`}
                onClick={(event) => handleChangeCategorie(event, element.id)}
                href="#"
              >
                {element.title}
              </a>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  // internal component for Items
  const CardItems = () => {
    if (isLoadItems) {
      return <Loader />;
    }
    if (errItems === null) {
      return (
        <div className="row">
          {!isLoadItems && items && (
            <div className="row">
              {items.map((element, index) => (
                <div key={`${element.id}-${index}`} className="col-4">
                  <ProductCard
                    id={element.id}
                    title={element.title}
                    price={element.price}
                    category={element.category}
                    imageSource={element.images[0]}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // internal component for load more
  const LoadMore = () => {
    if (isLoadMoreItems) {
      return (
        <div className="text-center">
          <Loader />
          <button disabled className="btn btn-outline-primary">
            Загрузить ещё
          </button>
        </div>
      );
    }
    if (isShowMore && !isLoadMoreItems && !isLoadItems) {
      return (
        <div className="text-center">
          <button onClick={handlerLoadMore} className="btn btn-outline-primary">
            Загрузить ещё
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {/* Строка поиска */}
      <FindKeyWords />
      {/* Категории */}
      <Categories />
      {/* Карточки товара */}
      <CardItems />
      {/* Загрузить еще */}
      <LoadMore />
    </section>
  );
};

Catalog.defauldProps = {
  isFind: false,
};

Catalog.propTypes = {
  isFind: PropTypes.bool,
};

export default Catalog;
