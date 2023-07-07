import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  onChangePage: (page: number) => void;
  currentPage: number;
}

const Pagination = ({ onChangePage, currentPage }: PaginationProps) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)} // index= 0, поэтому + 1
      pageRangeDisplayed={4} // 4 пицц на 1 стр
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1} // для отображения текущих страниц в ссылке
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
