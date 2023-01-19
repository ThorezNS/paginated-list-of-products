import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("https://reqres.in/api/products")
      .then((products) => products.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div>
      {products &&
        products.data.map((product, index) => {
          return <p key={index}>{product.name}</p>;
        })}
    </div>
  );
}

export default App;
