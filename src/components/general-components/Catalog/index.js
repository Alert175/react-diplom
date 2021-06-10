import useFetch from "../../../hooks/useFetch";
import Loader from "./loader";
import ProductCard from "../../home-components/productCard";

import { useState } from "react";

const Catalog = () => {
  const { categories, isLoadCategories, errCategories } = useFetch(
    "http://localhost:7070/api/categories",
    {}
  );

  const { items, isLoadItems, errItems } = useFetch(
    `http://localhost:7070/api/items`,
    {}
  );

  const [activeCategorie, setactiveCategorie] = useState(0);

  return String(isLoadCategories);

  // return errCategories == null && errItems == null ? (
  //   <div className="catalog">
  //     <h2 className="text-center">Каталог</h2>
  //     {isLoadCategories && <Loader />}
  //     {isLoadCategories ? (
  //       <Loader />
  //     ) : (
  //       String(isLoadCategories)
  //       // <ul className="catalog-categories nav justify-content-center">
  //       //   {/* {categories.map((element) => (
  //       //     <li key={element.id} className="nav-item">
  //       //       <a
  //       //         className={`nav-link ${activeCategorie === element.id}`}
  //       //         href="/"
  //       //       >
  //       //         {element.title}
  //       //       </a>
  //       //     </li>
  //       //   ))} */}
  //       // </ul>
  //     )}
  //   </div>
  // ) : null;
};

export default Catalog;
