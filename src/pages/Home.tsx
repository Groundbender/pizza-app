import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort, filtersData } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/pizzaSlice";

const Home = () => {
  // const navigate = useNavigate();

  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);

  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: any) => state.filter
  );

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const { items, status } = useSelector(selectPizzaData);
  const { sortProperty } = sort;
  const dispatch = useDispatch();

  const sortBy = sortProperty.replace("-", "");
  const order = sortProperty.includes("-") ? "asc" : "desc";
  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const getPizzas = async () => {
    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)); // без ? знака

  //     const sort = filtersData.find(
  //       (obj) => obj.sortProperty === params.sortProperty
  //     );

  //     dispatch(setFilters({ ...params, sort }));
  //     // проверка произошел ли dispatch
  //     isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    // if (!isSearch.current) {
    getPizzas();
    // }
    isSearch.current = false;
  }, [categoryId, sortProperty, currentPage, search]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortProperty, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" && skeletons}
        {status === "success" && pizzas}
      </div>
      {status === "error" && (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению не удалось получить пиццы. Попробуйте повторить попытку
            позже{" "}
          </p>
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export { Home };
