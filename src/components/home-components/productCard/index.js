import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ id, category, title, price, imageSource }) => {
  return (
    <div className="card" style={{height: '400px'}}>
      <img src={imageSource} onError={(e)=>{e.target.onerror = null; e.target.src="./holder.jpg"}} style={{maxHeight: '220px', objectFit: 'contain', width: '100%', height: '100%'}} className="card-img-top img-fluid" alt={title} />
      <div className="card-body">
        <p className="card-text">{title}</p>
        <p className="card-text">{price} руб.</p>
        <Link to={`/catalog/${id}`} className="btn btn-outline-primary">
          Заказать
        </Link>
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
