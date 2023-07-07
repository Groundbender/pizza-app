import React from "react";
import styles from "./NotFoundBlock.module.scss";
import { useLocation } from "react-router-dom";
const NotFoundBlock = () => {
  const location = useLocation();
  return (
    <div className={styles.root}>
      <h1>
        <span>&#128556;</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению страница по адресу{" "}
        <span className={styles.pathname}>{location.pathname}</span> отсутствует
      </p>
    </div>
  );
};

export { NotFoundBlock };
