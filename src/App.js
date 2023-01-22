import { useState, useEffect } from "react";
import Modal from "./components/Modal/Modal";
import Products from "./components/Products/Products";
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductsDetails] = useState({});
  const [copyOfProducts, setCopyOfProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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
        setProducts(data.data);
        setCopyOfProducts(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (products) {
      const filteredProduct = products.filter((product) => {
        return product.id === parseInt(inputValue);
      });
      if (inputValue > 0 && inputValue <= products.length) {
        setProducts(filteredProduct);
      } else {
        setProducts(copyOfProducts);
      }
    }
  }, [inputValue]);

  const handleChange = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setInputValue(result);
  };

  const openTheModal = (obj) => {
    setModalOpen(true);
    setProductsDetails(obj);
  };

  const closeTheModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <SearchInput inputValue={inputValue} handleChange={handleChange} />
      <Products
        error={error}
        isLoading={isLoading}
        products={products}
        openTheModal={openTheModal}
      />
      <Modal
        productDetails={productDetails}
        closeTheModal={closeTheModal}
        modalOpen={modalOpen}
      />
    </div>
  );
}

export default App;
