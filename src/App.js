import './App.css';
import GuitarBrands from "./pages/GuitarBrands";
import {Route, Routes } from "react-router-dom";
import GuitarModels from "./pages/GuitarModels";
import GuitarDetails from "./pages/GuitarDetails";

function App() {
  return (
      <Routes>
          <Route path="/" element={<GuitarBrands />} />
          <Route path="/:id" element={<GuitarModels />} />
          <Route path="/:id/:guitarId" element={<GuitarDetails />} />
      </Routes>

  );
}

export default App;
