import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Detalhes } from "./pages/Detalhes/Detalhes";
import { Favorites } from "./pages/Favorites";
import { Pesquisa } from "./pages/Pesquisa/Pesquisa";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Inserir pagina abaixo e importar */}
          <Route path="/detalhes/:id" element={<Detalhes />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/pesquisa/:id" element={<Pesquisa/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
