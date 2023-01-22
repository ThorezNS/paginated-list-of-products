import styles from "./Modal.module.css";

const Modal = ({ productDetails, closeTheModal, modalOpen }) => {
  const productDetailsProperty = Object.entries(productDetails);

  return (
    <div
      className={
        modalOpen ? `${styles.open} ${styles.container}` : styles.container
      }
    >
      <button className={styles.button} onClick={() => closeTheModal()}>
        x
      </button>
      <div className={styles.details}>
        {productDetailsProperty.map((array, i) => {
          return <ul key={i}>{`${array[0]} : ${array[1]}`}</ul>;
        })}
      </div>
    </div>
  );
};

export default Modal;
