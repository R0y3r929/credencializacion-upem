import React, { useEffect, useState } from 'react'
import '../styles/Inicio.css'
import '../styles/Alert.css'
import FormAlumno from '../Componentes/FormAlumno'
import { AnimatePresence, motion } from "motion/react";
import { Modal } from '../Componentes/Modal'
import ChipsCarreras from '../Componentes/ChipsCarreras'
import TableNi from '../Componentes/TableNi'
import TitlesPage from '../Componentes/TitlesPage'
import FormSolicitud from '../Componentes/FormSolicitud';

const Inicio = ({ formNi, closeForm }) => {
  const rescuperaSendSolicitud = localStorage.getItem('sendSolicitud');
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [filtroNi, setFiltroNi] = useState([]);
  const variants = {
    hidden: { opacity: 0 },
    visible: ({ delay }) => ({ opacity: 1, transition: { delay, duration: 1 } })
  };
  const cerrraMsj = (e) => {
    e.target.parentElement.style.display = 'none';
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [sendSolicitud, setSendSolicitud] = useState(false);
  const pointsReview = [{ point: 'Aqui podras consultar el status de tu credencial, si esta pendiente de entrega. ¡Ten a la mano tu matricula!' }, { point: 'El status de las credenciales se actualiza todos los dias a las 18:00 hrs (revisa diariamente)' }, { point: 'En caso de no haber iniciado tramite no podras darle seguimiento a tu status' }, { point: 'Si eres de Nuevo ingreso, es probable que tu credencial ya haya sido entregada a Coordinacion, para mas informacion acude directamente al Area de sistemas!!' }];
  useEffect(() => {
    if (rescuperaSendSolicitud && rescuperaSendSolicitud === 'true') {
      setSendSolicitud(true);
    }
  }, []);
  return (
    <>
      <div className='header'>
        <TitlesPage>Bienvenido Alumn@</TitlesPage>
      </div>
      <div className='content-text-descript'>
        {pointsReview.map((item, index) => (
          <AnimatePresence>
            <motion.span className='text-descript' custom={{ delay: (index + 1) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants} layoutId={index}>🔸{item.point}</motion.span>
          </AnimatePresence>
        ))}
        <AnimatePresence>
          <motion.span className="text-descript" custom={{ delay: (4 + 1) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants}>🔸Si aun no has iniciado Tramite y quieres cambiar fotografia <a href="https://forms.gle/4z7WfsjcSU67oCxM7">pulsa aqui</a></motion.span>
          {sendSolicitud ?   
            (<div className="android-alert success">
              <button className="alert-close" onClick={cerrraMsj}>&times;</button>
              <div className="alert-title">¡Éxito!</div>
              <div style={{color: 'gray', textAlign:'center'}}>Tu solicitud ha sido enviada, mantente pendiente al correo proporcionado en tu inscripcion para darle seguimiento!!</div>
            </div>)
            :
            <button onClick={() => { setModalOpen(true) }} className='btn-login' style={{margin: '15px auto' }}>{`SOLICITAR AQUI (SOLO NUEVO INGRESO)`}</button>
          }
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div className='content-form'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <FormAlumno />
        </motion.div>
      </AnimatePresence>
      {modalOpen && !sendSolicitud ? (
        <Modal onClose={() => setModalOpen(false)}>
          <FormSolicitud cerrar={setModalOpen} setSendSolicitud={setSendSolicitud}/>
        </Modal>
      ) : null}
      {formNi ? (
        <Modal onClose={closeForm}>
          <div className='form-NuevoIngreso'>
            <h2>Credenciales Nuevo Ingreso</h2>
            <div className='content-chips-carreras'>
              <ChipsCarreras selectedCarrera={selectedCarrera} setSelectedCarrera={setSelectedCarrera} setFiltroNi={setFiltroNi} />
            </div>
            <div className="regs-match-filtro">
              {
                (selectedCarrera != null) ? (
                  <fieldset className='fieldset-table-ni'>
                    <legend>Mostrando: {filtroNi.length} credenciales tramitadas de "{selectedCarrera}"</legend>
                    <TableNi alumnos={filtroNi} />
                  </fieldset>
                )
                  : ''
              }
            </div>
          </div>
        </Modal>
      ) : ''}
      <AnimatePresence mode="wait">
        <motion.div className='content-avisos'
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h3>AVISOS</h3>
          <div className="box-items-aviso">
            <ul>
              <li><u>El periodo de renovaciones de credenciales termino</u> mantente pendiente si ya tramitaste y estas pendiente de entrega.</li>
              <li>El ultimo dia que tienes para recoger si aun no lo has hecho es el 15 de enero del 2025.</li>
              <li>En caso de que tu tramite sea una <u>reposicion</u> sera necesario, acudas directamente al area de Sistemas en Plantel A, con la copia de tu recibo de pago en caso de haber pagado con algun otro concepto, original si solo pagaste credencial!!</li>
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </>

  )
}

export default Inicio
