import styles from "./Products.module.css";

const Products = ({ error, isLoading, products }) => {
  return (
    <div className={styles.wrapper}>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {products &&
        products.data.map((product, i) => {
          return (
            <ul className={styles.product} key={i}>
              {product.name}
            </ul>
          );
        })}
    </div>
  );
};

export default Products;
