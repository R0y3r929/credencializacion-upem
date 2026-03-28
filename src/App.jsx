import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from './Componentes/NavbarPersonal'
import Inicio from "./routes/Inicio";
import { useState } from "react";
import Footer from "./Componentes/Footer";
import { ThemeProvider } from "./Context/ThemeContext";
import { SolicitanteProvider } from "./Componentes/Hooks/useSolicitante";

function App() {
  const [modalNi, setmodalNi] = useState(false)
  const cerrarForm = () => {
    setmodalNi(false)
  }
  return (
    <ThemeProvider>
      <SolicitanteProvider>
        <Navbar modal={modalNi} setModal={setmodalNi} />
        <Routes basename="/dist">
          <Route path='/' element={<Inicio formNi={modalNi} closeForm={cerrarForm} />}></Route>
          <Route path='/inicio' element={<Inicio formNi={modalNi} closeForm={cerrarForm} />}></Route>
        </Routes>
        <Footer />
      </SolicitanteProvider>
    </ThemeProvider>
  )
}

export default App
