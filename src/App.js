import { useState, createContext } from "react";

import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";
import "./scss/app.scss";
import { SinglePizza } from "./pages/SinglePizza";
// export const SearchContext = createContext();

function App() {
  // const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<SinglePizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* </SearchContext.Provider> */}
    </div>
  );
}

export default App;
