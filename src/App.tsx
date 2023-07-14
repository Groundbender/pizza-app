import Loadable from "react-loadable";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import "./scss/app.scss";
import { MainLayout } from "./layouts/MainLayout";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Идет загрузка корзины....</div>,
});
const SinglePizza = Loadable({
  loader: () =>
    import(/* webpackChunkName: "SinglePizza" */ "./pages/SinglePizza"),
  loading: () => <div>Идет загрузка....</div>,
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"),
  loading: () => <div>Идет загрузка....</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<SinglePizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
