import { Routes, Route } from "react-router-dom";
import "swiper/css";

import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layouts/Header";

function App() {
  return (
    <main className="text-black">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404 Page not found!</h1>} />
      </Routes>
    </main>
  );
}

export default App;
