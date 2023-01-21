import styles from "./SearchInput.module.css";

const SearchInput = ({ inputValue, handleChange }) => {
  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder="search by id"
        value={inputValue}
        onChange={handleChange}
      />
    </>
  );
};

export default SearchInput;
