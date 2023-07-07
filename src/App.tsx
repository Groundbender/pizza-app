import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";
import "./scss/app.scss";
import { SinglePizza } from "./pages/SinglePizza";
import { MainLayout } from "./layouts/MainLayout";
// export const SearchContext = createContext();

function App() {
  // const [searchValue, setSearchValue] = useState("");

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
