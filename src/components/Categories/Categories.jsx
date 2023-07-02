import { useState } from "react";

const categoriesData = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories = ({ categoryValue, onChangeCategory }) => {
  // const [activeIndex, setActiveIndex] = useState(0);

  // const changeIndex = (index) => {
  //   setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {/* <li className="active">Все</li>
        <li>Мясные</li>
        <li>Вегетарианская</li>
        <li>Гриль</li>
        <li>Острые</li>
        <li>Закрытые</li> */}
        {categoriesData.map((title, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryValue === index ? "active" : ""}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Categories };
