import { useEffect, useState } from "react";

import { Categories } from "../components/Categories/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { Sort } from "../components/Sort/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";

const Home = () => {
  // https://mockapi.io/projects/649f5ab5245f077f3e9d836d
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sort: "rating",
  });

  const getData = async () => {
    const sortBy = sortType.sort.replace("-", "");
    const order = sortType.sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";

    try {
      setIsLoading(true);
      const res = await fetch(
        `https://649f5ab5245f077f3e9d836c.mockapi.io/items?sortBy=${sortBy}&order=${order}${category}`
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
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryValue={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort sortValue={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading && [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
        {!isLoading &&
          items.map((obj) => {
            const { id } = obj;

            return <PizzaBlock {...obj} key={id} />;
          })}
      </div>
    </div>
  );
};

export { Home };
