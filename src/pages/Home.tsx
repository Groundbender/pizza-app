import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { SortPopup, filtersData } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  FilterSliceState,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filterSlice";
import {
  SearchPizzaParams,
  fetchPizzas,
  selectPizzaData,
} from "../redux/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home = () => {
  const navigate = useNavigate();

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
  const dispatch = useAppDispatch();

  const sortBy = sortProperty.replace("-", "");
  const order = sortProperty.includes("-") ? "asc" : "desc";
  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params, { skipNulls: true });
  //     navigate(`?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  // }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, currentPage, search]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams; // без ? знака

  //     const sort = filtersData.find(
  //       (obj) => obj.sortProperty === params.sortBy
  //     );

  //     dispatch(
  //       setFilters({
  //         categoryId: +params.category,
  //         currentPage: +params.currentPage,
  //         searchValue: params.search,
  //         sort: sort ? sort : filtersData[0],
  //       })
  //     );
  //     // проверка произошел ли dispatch
  //     isMounted.current = true;
  //   }
  // }, []);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} />
        <SortPopup />
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
