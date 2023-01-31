import { useState, useEffect } from "react";
import Modal from "./components/Modal/Modal";
import { Pagination } from "./components/Pagination/Pagination";
import Products from "./components/Products/Products";
import SearchInput from "./components/SearchInput/SearchInput";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductsDetails] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [productsPerPage] = useState(5);
  const [productsInTheTable, setProductsInTheTable] = useState([]);
  const [hash, setHash] = useState("");

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
        setCurrentPage(1);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getPaginatedTable(currentPage);
    getThePageHash();
  }, [currentPage]);

  useEffect(() => {
    getProductById();
  }, [inputValue]);

  useEffect(() => {
    window.location.hash = hash;
  }, [hash]);

  const getThePageHash = () => {
    if (currentPage) return setHash(`page_${currentPage.toString()}`);
  };

  const getTheIdHash = (array) => {
    setHash(`id_${array[0].id}`);
  };

  const getProductById = () => {
    const filteredProduct = products.filter((product) => {
      return product.id === parseInt(inputValue);
    });
    if (inputValue > 0 && inputValue <= products.length) {
      setProductsInTheTable(filteredProduct);
      getTheIdHash(filteredProduct);
    } else {
      getPaginatedTable(currentPage);
      getThePageHash();
    }
  };

  const getPaginatedTable = (pageNumber) => {
    const indexOfLastProduct = productsPerPage * pageNumber;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setProductsInTheTable(
      products.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  };

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

  const previousTable = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    setInputValue("");
  };

  const nextTable = () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
    setInputValue("");
  };

  return (
    <div className="container">
      <SearchInput inputValue={inputValue} handleChange={handleChange} />
      <Products
        error={error}
        isLoading={isLoading}
        productsInTheTable={productsInTheTable}
        openTheModal={openTheModal}
      />
      <Modal
        productDetails={productDetails}
        closeTheModal={closeTheModal}
        modalOpen={modalOpen}
      />
      <Pagination previousTable={previousTable} nextTable={nextTable} />
    </div>
  );
}

export default App;
