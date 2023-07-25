import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NavBar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="page-container App">
      <div className="content-wrapper">
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/" element={<Home />} />
          <Route path="" element={<Home />} />
          <Route element={NotFound} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
