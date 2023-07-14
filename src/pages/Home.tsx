import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { selectPizzaData } from "../redux/pizza/selectors";
import { useSelector } from "react-redux";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";

import {
  Categories,
  PizzaBlock,
  SortPopup,
  Pagination,
  Skeleton,
} from "../components";

const Home = () => {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: any) => state.filter
  );

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

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

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, currentPage, search]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} />
        <SortPopup sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" && skeletons}
        {status === "success" && pizzas}
      </div>
      {status === "error" ||
        (pizzas.length === 0 && (
          <div className="content__error-info">
            <h2>
              Произошла ошибка <span>😕</span>
            </h2>
            <p>
              К сожалению не удалось получить пиццы. Попробуйте повторить
              попытку позже
            </p>
          </div>
        ))}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export { Home };
