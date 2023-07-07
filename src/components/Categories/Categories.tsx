import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../../redux/filterSlice";
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

const Categories = ({ onChangeCategory }: CategoriesProps) => {
  const categoryId = useSelector((state: any) => state.filter.categoryId);

  const dispatch = useDispatch();

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
};

export { Categories };
