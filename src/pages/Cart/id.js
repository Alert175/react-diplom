import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addedProduct } from "../../components/cart-components/Basket/basketSlice";
import useFetch from "../../hooks/useFetch";
import Loader from "./loader";

const PageProduct = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, isLoad, error] = useFetch(
    `http://localhost:7070/api/items/${id}`
  );
  const [activeSize, setactiveSize] = useState(null);
  const [counter, setcounter] = useState(0);

  const dispatch = useDispatch();

  const handlerAddToBasket = () => {
    dispatch(
      addedProduct({
        id: data.id,
        title: data.title,
        price: data.price,
        size: activeSize,
        count: counter,
      })
    );
    history.push("/cart");
  };

  if (isLoad) {
    return <Loader />;
  }
  if (!error && data) {
    return (
      <section className="catalog-item">
        <h2 className="text-center">{data.title}</h2>
        <div className="row">
          <div className="col-5">
            <img src={data.images[0]} className="img-fluid" alt="" />
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{data.sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{data.manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{data.color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{data.material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{data.season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{data.reason}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <p>
                Размеры в наличии:{" "}
                {/* <span className="catalog-item-size selected">18 US</span> */}
                {data.sizes.map(
                  (element, index) =>
                    element.avalible && (
                      <span
                        key={index}
                        className={`catalog-item-size ${
                          element.size === activeSize ? "selected" : ""
                        }`}
                        onClick={() => setactiveSize(element.size)}
                      >
                        {element.size}
                      </span>
                    )
                )}
              </p>
              <p>
                Количество:{" "}
                <span className="btn-group btn-group-sm pl-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      if (counter > 0) {
                        setcounter((prev) => (prev -= 1));
                      }
                    }}
                  >
                    -
                  </button>
                  <span className="btn btn-outline-primary">{counter}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      if (counter < 10) {
                        setcounter((prev) => (prev += 1));
                      }
                    }}
                  >
                    +
                  </button>
                </span>
              </p>
            </div>
            {data.sizes.find((element) => element.avalible === true) && (
              <button
                disabled={counter === 0 || activeSize === null}
                className="btn btn-danger btn-block btn-lg"
                onClick={handlerAddToBasket}
              >
                В корзину
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default PageProduct;
