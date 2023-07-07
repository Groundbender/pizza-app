import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const SinglePizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://649f5ab5245f077f3e9d836c.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    })();
  }, [id]);

  if (!pizza) {
    return <p>Загрузка</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img style={{ textAlign: "center" }} src={pizza.imageUrl} alt="" />
    </div>
  );
};
