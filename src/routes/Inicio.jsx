import React, { useState } from 'react'
import '../styles/Inicio.css'
import FormAlumno from '../Componentes/FormAlumno'
import { Modal } from '../Componentes/Modal'
import ChipsCarreras from '../Componentes/ChipsCarreras'
import TableNi from '../Componentes/TableNi'

const Inicio = ({formNi, closeForm}) => {
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [filtroNi, setFiltroNi] = useState([])
  return (
    <>
        <div className='header'>
          <h1>Bienvenido Alumn@</h1>
        </div>
        <div className='content-text-descript'>
          <span className='text-descript'>🔸Aqui podras consultar el status de tu credencial, si esta pendiente de entrega. ¡Ten a la mano tu matricula!</span>
          <span className="text-descript">🔸El status de las credenciales se actualiza todos los dias a las 18:00 hrs (revisa diariamente)</span>
          <span className='text-descript'>🔸En caso de no haber iniciado tramite no podras darle seguimiento a tu status </span>
          <span className="text-descript">🔸Si eres de <b>Nuevo ingreso</b>, es probable que tu credencial ya haya sido entregada a Coordinacion, para mas informacion acude directamente al Area de sistemas!!</span>
          <span className="text-descript">🔸Si aun no has iniciado Tramite y quieres cambiar fotografia <a href="https://forms.gle/4z7WfsjcSU67oCxM7">pulsa aqui</a></span>
        </div>
        <div className='content-form'>
          <FormAlumno/>
        </div>
        {formNi ? (
          <Modal onClose={closeForm}>
            <div className='form-NuevoIngreso'>
              <h2>Credenciales Nuevo Ingreso</h2>
              <div className='content-chips-carreras'>
                <ChipsCarreras selectedCarrera={selectedCarrera} setSelectedCarrera={setSelectedCarrera} setFiltroNi={setFiltroNi}/>
              </div>
              <div className="regs-match-filtro">                
                {
                  (selectedCarrera != null) ? (
                    <fieldset>
                      <legend>Mostrando: {filtroNi.length} credenciales tramitadas de "{selectedCarrera}"</legend> 
                      <TableNi alumnos={filtroNi}/>
                    </fieldset>
                  )
                  : ''
                } 
              </div>
            </div>
          </Modal>
        ):''}
        <div className='content-avisos'>
          <h3>AVISOS</h3>
          <div className="box-items-aviso">
            <ul>
              <li><u>El periodo de tramite de credenciales termino</u> mantente pendiente si ya tramitaste y estas pendiente de entrega.</li>
              <li>El ultimo dia que tienes para recoger si aun no lo has hecho es el 15 de enero del 2025.</li>
            </ul>
          </div>
        </div>
    </>
    
  )
}

export default Inicio
