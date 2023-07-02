import { useContext, useEffect, useState } from "react";
import { Categories } from "../components/Categories/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../Pagination/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/filterSlice";
const Home = () => {
  // https://mockapi.io/projects/649f5ab5245f077f3e9d836d

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  // const [sortType, setSortType] = useState({
  //   name: "популярности",
  //   sort: "rating",
  // });

  const { categoryId, sort } = useSelector((state) => state.filter);
  const { sortProperty } = sort;

  const sortBy = sortProperty.replace("-", "");
  const order = sortProperty.includes("-") ? "asc" : "desc";
  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://649f5ab5245f077f3e9d836c.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`
      );
      if (!res.ok) {
        throw new Error("Couldn't fetch");
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(`Something went wrong: ${error}`);
      return undefined;
    }
  };

  useEffect(() => {
    getData().then((arr) => {
      setItems(arr);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortProperty, searchValue, currentPage]);

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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export { Home };
