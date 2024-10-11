import React from 'react'
import '../styles/Inicio.css'
import FormAlumno from '../Componentes/FormAlumno'

const Inicio = () => {
  return (
    <>
        <div className='header'>
            <h1>Bienvenido Alumn@</h1>
        </div>
        <div className='content-text-descript'>
          <span className='text-descript'>🔸Aqui podras consultar el status de tu credencial recuerda tener a la mano tu matricula</span>
          <span className="text-descript">🔸El status de las credenciales se actualizan todos los lunes despues de las 10am</span>
          <span className='text-descript'>🔸En caso de no haber iniciado tramite no podras darle seguimiento a tu status </span>
          <span className="text-descript">🔸Si aun no has iniciado Tramite y quieres cambiar fotografia <a href="https://forms.gle/4z7WfsjcSU67oCxM7">pulsa aqui</a></span>
        </div>
        <div className='content-form'>
          <FormAlumno/>
        </div>
    </>
    
  )
}

export default Inicio
