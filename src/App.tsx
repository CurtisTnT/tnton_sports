import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layouts/Header";
import SaleRacketsShoes from "./pages/SaleOff/SaleRacketsShoes";
import SaleClothes from "./pages/SaleOff/SaleClothes";
import StoreProvider from "./context/StoreProvider";
import Rackets from "./pages/Products/Rackets";
import Shirts from "./pages/Products/Shirts";
import Shoes from "./pages/Products/Shoes";
import Pants from "./pages/Products/Pants";
import Dresses from "./pages/Products/Dresses";
import RacketsDetails from "./pages/Products/Rackets/Details";
import ShoesDetails from "./pages/Products/Shoes/Details";
import ShirtsDetails from "./pages/Products/Shirts/Details";
import PantsDetails from "./pages/Products/Pants/Details";
import DressesDetails from "./pages/Products/Dresses/Details";

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
            <Route path="rackets/:productId" element={<RacketsDetails />} />
            <Route path="shoes" element={<Shoes />} />
            <Route path="shoes/:productId" element={<ShoesDetails />} />
            <Route path="shirts" element={<Shirts />} />
            <Route path="shirts/:productId" element={<ShirtsDetails />} />
            <Route path="pants" element={<Pants />} />
            <Route path="pants/:productId" element={<PantsDetails />} />
            <Route path="dresses" element={<Dresses />} />
            <Route path="dresses/:productId" element={<DressesDetails />} />
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
