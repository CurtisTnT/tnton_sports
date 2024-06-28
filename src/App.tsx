import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layouts/Header";
import SaleRacketsShoes from "./pages/SaleOff/SaleRacketsShoes";
import SaleClothes from "./pages/SaleOff/SaleClothes";
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
import FavoriteProductsModal from "./components/modals/FavoriteProductModal";
import CartModal from "./components/modals/CartModal";
import { useStore } from "./context/Store";
import { useEffect } from "react";
import { getClothes, getRacketsAndShoes } from "./services/productsAction";
import SearchResults from "./pages/SearchResults";
import News from "./pages/News";
import Contact from "./pages/Contact";

function App() {
  const { setAppState } = useStore();

  useEffect(() => {
    (async () => {
      const res = await getRacketsAndShoes();
      setAppState((prev) => ({ ...prev, racketsAndShoes: res }));
    })();

    (async () => {
      const res = await getClothes();
      setAppState((prev) => ({ ...prev, clothes: res }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative text-black">
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
          <Route path="" element={<Navigate to="/sale-off/rackets-shoes" />} />
          <Route path="rackets-shoes" element={<SaleRacketsShoes />} />
          <Route path="clothes" element={<SaleClothes />} />
        </Route>
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>404 Page not found!</h1>} />
      </Routes>

      <FavoriteProductsModal />
      <CartModal />
    </main>
  );
}

export default App;
