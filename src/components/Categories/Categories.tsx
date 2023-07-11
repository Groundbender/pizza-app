import React from "react";
import { useSelector } from "react-redux";
const categoriesData = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type CategoriesProps = {
  onChangeCategory: (index: number) => void;
};

const Categories = React.memo(({ onChangeCategory }: CategoriesProps) => {
  const categoryId = useSelector((state: any) => state.filter.categoryId);

  return (
    <div className="categories">
      <ul>
        {categoriesData.map((title, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? "active" : ""}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
});

export { Categories };
