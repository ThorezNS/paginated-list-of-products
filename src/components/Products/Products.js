import styles from "./Products.module.css";

const Products = ({ error, isLoading, products, openTheModal }) => {
  return (
    <div className={styles.wrapper}>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {products &&
        products.map((product, i) => {
          return (
            <ul
              onClick={() => openTheModal(product)}
              style={{
                backgroundColor:
                  product.color !== undefined ? `${product.color}` : "unset",
              }}
              className={styles.product}
              key={i}
            >
              <span>{product.id}</span>
              <span className={styles.name}>{product.name}</span>
              <span>{product.year}</span>
            </ul>
          );
        })}
    </div>
  );
};

export default Products;
