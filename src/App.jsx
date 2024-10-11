import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from './Componentes/NavbarPersonal'
import Inicio from "./routes/Inicio";

function App() {
  return (
    <>
      <Navbar/>
      <Routes basename="/dist">
        <Route path='/' element={<Inicio></Inicio>}></Route>
        <Route path='/inicio' element={<Inicio></Inicio>}></Route>
      </Routes>
    </>
  )
}

export default App
