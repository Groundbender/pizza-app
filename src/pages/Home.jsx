import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort, filtersData } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../Pagination/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setFilters } from "../redux/filterSlice";
const Home = () => {
  const navigate = useNavigate();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);

  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const { sortProperty } = sort;
  const dispatch = useDispatch();

  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = sortProperty.replace("-", "");
    const order = sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    axios
      .get(
        `https://649f5ab5245f077f3e9d836c.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); // без ? знака

      const sort = filtersData.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort }));
      // проверка произошел ли dispatch
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!isSearch.current) {
    // }
    fetchPizzas();
    isSearch.current = false;
  }, [categoryId, sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProperty, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading && skeletons}
        {!isLoading && pizzas}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};

export { Home };
