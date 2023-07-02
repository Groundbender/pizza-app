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

const Categories = ({ onChangeCategory }) => {
  const categoryId = useSelector((state) => state.filter.categoryId);

  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categoriesData.map((title, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
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
