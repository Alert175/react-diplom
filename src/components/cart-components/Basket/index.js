import { useDispatch, useSelector } from "react-redux";
import { selectProducts, deleteProduct } from "./basketSlice";
import { Link } from "react-router-dom";

const Basket = () => {
  // store state
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  // internal component
  const GeneralCost = () => {
    let cost = 0;
    for (const { count, price } of products) {
      cost += Number(count) * Number(price);
    }
    return cost;
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((element, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`/catalog/${element.id}`}>{element.title}</Link>
              </td>
              <td>{element.size}</td>
              <td>{element.count}</td>
              <td>{element.price} руб.</td>
              <td>{Number(element.price) * Number(element.count)} руб.</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => dispatch(deleteProduct(element.id))}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>
              <GeneralCost /> руб.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Basket;
