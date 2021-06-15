import { useDispatch, useSelector } from "react-redux";
import { clearProduts, selectProducts } from "../Basket/basketSlice";
import { useState } from "react";
import axios from "axios";

import Loader from "./loader";

const Order = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [isAgreement, setisAgreement] = useState(false);
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [statusOrder, setstatusOrder] = useState(null);

  const sendOrder = async () => {
    try {
      setstatusOrder("pending");
      await axios.post("http://localhost:7070/api/order", {
        data: {
          owner: {
            phone: phone,
            address: address,
          },
          items: products,
        },
      });
      dispatch(clearProduts());
      setstatusOrder("success");
    } catch (error) {
      console.error(error);
      setstatusOrder("error");
    }
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (
      phone !== " " &&
      phone !== "" &&
      address !== " " &&
      address !== "" &&
      isAgreement &&
      statusOrder === null &&
      products.length > 0
    ) {
      sendOrder();
    }
  };

  if (statusOrder === "pending") {
    return <Loader />;
  }

  if (statusOrder === "success") {
    return <h2 class="text-center">Заказ успешно оформлен</h2>;
  }

  if (statusOrder === "error") {
    return <h2 class="text-center">Произошла ошибка, попробуйте позже</h2>;
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div
        className="card"
        style={{
          maxWidth: `30rem`,
          margin: `0 auto`,
        }}
      >
        <form className="card-body" onSubmit={handlerSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              value={phone}
              onInput={(event) => setphone(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              value={address}
              onInput={(event) => setaddress(event.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              checked={isAgreement}
              onChange={() => setisAgreement(!isAgreement)}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-secondary"
            disabled={
              phone === " " ||
              phone === "" ||
              address === " " ||
              address === "" ||
              !isAgreement ||
              statusOrder !== null ||
              products.length === 0
            }
          >
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
};

export default Order;
