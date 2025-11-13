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
import useSolicitante from '../Componentes/Hooks/useSolicitante';
import Timelineprocess from '../Componentes/Timelineprocess';
import CardInfo from '../Componentes/CardInfo';

const Inicio = ({ formNi, closeForm }) => {
  const rescuperaSendSolicitud = localStorage.getItem('sendSolicitud');
  const recoveryUser = localStorage.getItem('solicitante');
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const msjStatus=[
    {'Por procesar':'Tu credencial esta por procesarse!!..'}, 
    {'GENERADA':'Tu credencial ha sido generada, Mantente pendiente pronto aparecera como: "IMPRESA"'},
    {'IMPRESA':'Tu credencial ha sido impresa, Ya puedes recogerla en el Area de Sistemas!! (Recuerda llevar copia de tu recibo de pago)'},
    {'ENTREGADA': 'Tu credencial ya ha sido entregada!!, si necesitas una reposicion acude al area de Sistemas con tu recibo de pago.'}];
  const [filtroNi, setFiltroNi] = useState([]);
  const { user, setUser, matchedUser } = useSolicitante();
  const variants = {
    hidden: { opacity: 0 },
    visible: ({ delay }) => ({ opacity: 1, transition: { delay, duration: 1 } })
  };
  const cerrraMsj = (e) => {
    e.target.parentElement.style.display = 'none';
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [sendSolicitud, setSendSolicitud] = useState(false);
  const pointsReview = [{title: 'Actualización diaria', point: 'El status de las credenciales se actualiza todos los dias a las 18:00 hrs (revisa diariamente)' }, {title: 'Tramite Pendiente', point: 'En caso de no haber iniciado tramite no podras darle seguimiento a tu status' }, {title: 'Renovación', point: 'Para renovar tu credencial con nueva fotografía, completa el formulario.' }];
  const iconsPoints = ['time', 'Alert', 'reload'];
  useEffect(() => {
    if (rescuperaSendSolicitud && rescuperaSendSolicitud === 'true') {
      setSendSolicitud(true);
      recoveryUser && setUser(JSON.parse(recoveryUser));
    }
  }, []);
  return (
    <>
      <div className='header'>
        <TitlesPage>Bienvenido Alumn@</TitlesPage>
      </div>
      <div className='content-text-descript'>
        {/*pointsReview.map((item, index) => (
          <AnimatePresence>
            <motion.span className='text-descript' custom={{ delay: (index + 1) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants} layoutId={index}>🔸{item.point}</motion.span>
          </AnimatePresence>
        ))*/}
        <div className='content-cardInfo'>
          {pointsReview.map((item, index) => (
            <CardInfo key={index} icon={iconsPoints[index]} title={item.title} descript={item.point} />
          ))}
        </div>
        <AnimatePresence>
          <motion.span className="text-descript" custom={{ delay: (3 + 1) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants}>🔸Si vas a <u>Renovar tu credencial y quieres cambiar fotografia </u><a href="https://forms.gle/4z7WfsjcSU67oCxM7">pulsa aqui</a> o pulsa el el boton abajo,<br/> Si no quieres cambiar de foto acude directamente a Sistemas con copia de tu recibo para tramitar!!</motion.span>
          {/*<motion.span className="text-descript" custom={{ delay: (4 + 1) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants}>🔸Si eres de <u>Nuevo Ingreso</u> y aun no has tramitado tu credencial, puedes solicitarlo <b>una sola vez</b> dando click en el boton que aparece abajo.</motion.span>*/}
          {sendSolicitud ?   
            (<div className="android-alert success">
              <button className="alert-close" onClick={cerrraMsj}>&times;</button>
              <div className="alert-title">¡Éxito!</div>
              <div style={{color: 'gray', textAlign:'center'}}>
                Tu solicitud ha sido enviada, mantente pendiente al correo proporcionado en tu inscripcion para darle seguimiento!!
                { user &&
                  <ul>
                    <li>Te registraste con los siguientes Datos:</li>
                    <li>Matricula: {user.matricula}</li>
                    <li>Nombre: {user.nombre}</li>
                    <li>Carrera: {user.carrera}</li>
                  </ul>
                }
              </div>
            </div>)
            :
            <button onClick={() => { setModalOpen(true) }} className='btn-login' style={{margin: '15px auto' }}>{`SOLICITAR CREDENCIAL AQUI!!`}</button>
          }
          {user && sendSolicitud && (
            <Timelineprocess user={user} />
          )}
          {matchedUser && sendSolicitud &&
            <div className='info-matched'>
              <div className="alert-title-succes">¡Tu registro ya se proceso!</div>
              <div style={{color: 'gray', textAlign:'center'}}>
                {
                  msjStatus.map((msj)=>(
                    Object.keys(msj).map((key)=>{
                      if(key===user.status){
                        return(<p key={key}>{msj[key]}</p>)
                      }
                      return null;
                    })
                  ))
                }                
              </div>
            </div>
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
          <FormSolicitud cerrar={setModalOpen} setSendSolicitud={setSendSolicitud} setUser={setUser}/>
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
              <li><u>El periodo de RENOVACIONES periodo 26/1 INICIA!!</u>, Mantente pendiente si ya tramitaste y estas pendiente de entrega.</li>
              <li>Si ya tramitaste tienes 10 dias apartir de que aparece impresa para poder recoger.</li>
              <li>En caso de que tu tramite sea una <u>reposicion</u> sera necesario, acudas directamente al area de Sistemas en Plantel A, con la copia de tu recibo de pago en caso de haber pagado con algun otro concepto, original si solo pagaste credencial!!</li>
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </>

  )
}

export default Inicio
