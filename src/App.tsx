import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layouts/Header";
import RacketsShoes from "./pages/SaleOff/RacketsShoes";
import Clothes from "./pages/SaleOff/Clothes";
import StoreProvider from "./context/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <main className="text-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sale-off" element={<Outlet />}>
            <Route
              path=""
              element={<Navigate to="/sale-off/rackets-shoes" />}
            />
            <Route path="rackets-shoes" element={<RacketsShoes />} />
            <Route path="clothes" element={<Clothes />} />
          </Route>
          <Route path="*" element={<h1>404 Page not found!</h1>} />
        </Routes>
      </main>
    </StoreProvider>
  );
}

export default App;
