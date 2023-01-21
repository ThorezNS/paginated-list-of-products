import { useState, useEffect } from "react";
import Products from "./components/Products/Products";
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [inputValue, setInputValue] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage, setProductsPerPage] = useState(5);

  useEffect(() => {
    fetch("https://reqres.in/api/products")
      .then((products) => {
        const fetchError = !products.ok;
        if (fetchError) {
          throw Error("Could not fetch the data for that resource");
        }
        return products.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setInputValue(result);
  };

  return (
    <div className="container">
      <SearchInput inputValue={inputValue} handleChange={handleChange} />
      <Products error={error} isLoading={isLoading} products={products} />
    </div>
  );
}

export default App;
