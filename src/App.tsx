import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layouts/Header";
import SaleRacketsShoes from "./pages/SaleOff/SaleRacketsShoes";
import SaleClothes from "./pages/SaleOff/SaleClothes";
import StoreProvider from "./context/StoreProvider";
import Rackets from "./pages/Products/AllRacketsShoes/Rackets";
import AllClothes from "./pages/Products/AllClothes";
import Shoes from "./pages/Products/AllRacketsShoes/Shoes";

function App() {
  return (
    <StoreProvider>
      <main className="text-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Outlet />}>
            <Route path="" element={<Navigate to="/products/rackets" />} />
            <Route path="rackets" element={<Rackets />} />
            <Route path="shoes" element={<Shoes />} />
            <Route path="clothes" element={<AllClothes />} />
          </Route>
          <Route path="/sale-off" element={<Outlet />}>
            <Route
              path=""
              element={<Navigate to="/sale-off/rackets-shoes" />}
            />
            <Route path="rackets-shoes" element={<SaleRacketsShoes />} />
            <Route path="clothes" element={<SaleClothes />} />
          </Route>
          <Route path="*" element={<h1>404 Page not found!</h1>} />
        </Routes>
      </main>
    </StoreProvider>
  );
}

export default App;
