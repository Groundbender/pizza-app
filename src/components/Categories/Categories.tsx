import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
export const categoriesData = [
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

export const Categories = React.memo(
  ({ onChangeCategory }: CategoriesProps) => {
    const categoryId = useSelector(
      (state: RootState) => state.filter.categoryId
    );

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
  }
);
