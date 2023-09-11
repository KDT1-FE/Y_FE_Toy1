import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Gallery, Login, Wiki } from "./pages/pageIndex";
import Header from "./components/Header";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}
