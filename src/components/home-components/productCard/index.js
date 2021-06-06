import PropTypes from "prop-types";

const ProductCard = ({ id, category, title, price, imageSource }) => {
  return (
    <div className="card">
      <img src={imageSource} className="card-img-top img-fluid" alt={title} />
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <a href="/products/1.html" className="btn btn-outline-primary">
          Заказать
        </a>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  id: 0,
  category: 0,
  title: "",
  price: 0,
  imageSource: "",
};

ProductCard.propTypes = {
  id: PropTypes.number,
  category: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  imageSource: PropTypes.string,
};

export default ProductCard;
