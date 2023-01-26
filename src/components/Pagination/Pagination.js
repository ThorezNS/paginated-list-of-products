import styles from "./Pagination.module.css";

export const Pagination = ({ previousTable, nextTable }) => {
  return (
    <div className={styles.container}>
      <button onClick={previousTable}>{"<"}</button>
      <button onClick={nextTable}>{">"}</button>
    </div>
  );
};
