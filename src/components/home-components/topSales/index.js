import useFetch from "../../../hooks/useFetch";
import Loader from "../../general-components/Loader";
import ProductCard from "../productCard";

const TopSales = () => {
  const [response, isLoading, error] = useFetch(
    "http://localhost:7070/api/top-sales",
    {}
  );

  return (
    <section>
      {response !== [] && error === null && (
        <h2 className="text-center">Хиты продаж</h2>
      )}
      {isLoading && <Loader />}
      {!isLoading && response && (
        <div className="row">
          {response.map((element) => (
            <div key={element.id} className="col-4">
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
    </section>
  );
};

export default TopSales;
