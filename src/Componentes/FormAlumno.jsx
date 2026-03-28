import React, { useState } from 'react'
import credenciales from '../files/credenciales'
import Notifs from './Notifs';
import { Modal } from './Modal';
import { motion } from "motion/react";
import Constantes from '../Constantes';
import '../styles/FormAlumno.css';
import useSolicitante from './Hooks/useSolicitante';

const calculaVigencia = function (fecha) {
    const arrayMonth = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const pDig = fecha.substring(0, 2);
    const digito = pDig - 1;
    const ano = fecha.substring(2, 7);
    const mesLetra = arrayMonth[digito];
    return mesLetra + " de " + ano;
};
const notifs = {
    msgGenerada: `🔸"La credencial ya se tramitó, pero aún no está lista (aún no se encuentra impresa).`,
    msg2Generada: `¡¡ Mantente al pendiente por si el status cambia. !!`,
    msgImpresa: `🟢 La credencial se encuentra impresa, ya puedes pasar a recoger no olvides llevar copia de tu recibo de pago  y pluma para firmar!!`,
    msg2Impresa: `🟠 En caso de haber dejado copia, Sera necesario recuerdes el dia en que iniciaste tramite para agilizar la busqueda del mismo`,
    msgEntregada: `✅ Esta credencial ya se Entrego!!`
};

const CardMatch = ({ user, setMatchedUser, guardaSendSolicitud, guardaUser, onClose }) => {
    const variants = {
        hidden: { opacity: 0, y: 10 },
        visible: ({ delay }) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } })
    };

    const isGenerada = user.status === "GENERADA";
    const statusClass = isGenerada ? 'generada' : (user.status === "IMPRESA" || user.status === "ENTREGADA") ? 'impresa' : '';

    const darSeguimiento = () => {
        guardaUser({
            matricula: user.folio,
            nombre: user.NOMBRE + " " + user.PATERNO + " " + user.MATERNO,
            carrera: user.carrera,
            status: user.status,
        })
        setMatchedUser(true)
        guardaSendSolicitud()
        onClose()
    }

    return (
        <div className='resultado-card-elegant'>
            <motion.div className='card-header-elegant' custom={{ delay: 0.1 }} initial='hidden' animate='visible' variants={variants}>
                <h3>{user.NOMBRE} {user.PATERNO} {user.MATERNO}</h3>
                <p>{user.carrera} | {user.modalidad}</p>
            </motion.div>

            <div className='info-grid'>
                <motion.div className="info-row" custom={{ delay: 0.2 }} initial='hidden' animate='visible' variants={variants}>
                    <span className="info-label">Vigencia</span>
                    <span className="info-value">{calculaVigencia(user.vigencia)}</span>
                </motion.div>

                <motion.div className="info-row" custom={{ delay: 0.3 }} initial='hidden' animate='visible' variants={variants}>
                    <span className="info-label">Status de Trámite</span>
                    <div className={`status-badge ${statusClass}`}>
                        {user.status === "GENERADA" ? "EN TRAMITE" : user.status}
                    </div>
                </motion.div>
            </div>

            <motion.div className='notif-box-elegant' custom={{ delay: 0.4 }} initial='hidden' animate='visible' variants={variants}>
                {isGenerada ? (
                    <>
                        <span>{notifs.msgGenerada}</span>
                        <strong>{notifs.msg2Generada}</strong>
                    </>
                ) : user.status === "IMPRESA" ? (
                    <>
                        <span>{notifs.msgImpresa}</span>
                        <strong>{notifs.msg2Impresa}</strong>
                    </>
                ) : (
                    <span>{notifs.msgEntregada}</span>
                )}
            </motion.div>
            <motion.div custom={{ delay: 0.5 }} initial='hidden' animate='visible' variants={variants}>
                <button className='close-btn-elegant seguimiento' onClick={darSeguimiento}>Dar seguimiento a Credencial</button>
            </motion.div>
            <motion.div custom={{ delay: 0.5 }} initial='hidden' animate='visible' variants={variants}>
                <button className='close-btn-elegant close' onClick={onClose}>Cerrar Detalle</button>
            </motion.div>
        </div>
    )
}

const FormAlumno = () => {
    const initialForm = { matricula: '' }
    const [inputs, setInputs] = useState(initialForm)
    const [isLogin, setIsLogin] = useState(false);
    const { user, setUser, setMatchedUser, guardaUser, guardaSendSolicitud } = useSolicitante();
    //const [user, setUser] = useState('')
    const [msj, setMsj] = useState('')

    const cerrarModal = () => {
        setIsLogin(false);
        setInputs({ matricula: '' })
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        if (e.target.type !== "file") {
            setInputs({
                ...inputs,
                [name]: value.toUpperCase()
            })
        } else {
            setInputs({
                ...inputs,
                [name]: value
            })
        }
    }

    const fetchDataAlumn = async (matricula) => {
        if (matricula !== '' && matricula.length === 9) {
            const url = `${Constantes.RUTA_API_GLOBAL}/api/credenciales/getCredencialAlumn/${matricula}`;
            try {
                const peticion = await fetch(url)
                const resp = await peticion.json()

                if (resp.status !== 500) {
                    if (resp.length > 0) {
                        setUser(resp[0])
                        setIsLogin(true)
                        setMsj('')
                    } else {
                        alert(`🔸El alumno ${matricula} no existe o no ha tramitado, Contacte con Sistemas`);
                        setUser('')
                        setIsLogin(false)
                        setMsj(`¡¡No existe trámite de credencialización para: ${matricula} o ya realizó el trámite y está entregada. Para más información, contacta a sistemas.!!`);
                    }
                } else {
                    alert(`🔸El alumno ${matricula} no existe o no ha tramitado, Contacte con Sistemas`);
                    setUser('')
                    setIsLogin(false)
                    setMsj(`¡¡No existe trámite de credencialización para: ${matricula} o ya realizó el trámite y está entregada. Para más información, contacta a sistemas.!!`);
                }
            } catch (error) {
                console.error("Fetch error: ", error);
            }
        } else {
            alert(`🚫 Proporciona alguna matricula valida (9 digitos) para poder buscar!!`)
        }
    }

    const getAccess = (e) => {
        e.preventDefault()
        fetchDataAlumn(inputs.matricula)
    }

    return (
        <div className='form-alumno-container'>
            <div className='form-login-search-elegant'>
                <h2 className='search-title'>Seguimiento Credencialización</h2>
                <form className='form-login-alumno' onSubmit={getAccess}>
                    <div className='input-elegant-group'>
                        <label className='input-elegant-label' htmlFor="matricula">Matrícula</label>
                        <input
                            className='input-elegant'
                            type="search"
                            onChange={onChange}
                            placeholder='Ej: 123456789'
                            id='matricula'
                            name='matricula'
                            value={inputs.matricula}
                            maxLength={9}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <button className='btn-elegant search' type='submit'>
                            Buscar Trámite
                        </button>
                    </div>
                </form>
            </div>

            {isLogin ? (
                <Modal onClose={cerrarModal}>
                    <CardMatch user={user} setMatchedUser={setMatchedUser} guardaSendSolicitud={guardaSendSolicitud} guardaUser={guardaUser} onClose={cerrarModal} />
                </Modal>
            ) : (msj !== '') ? (<Notifs msj={msj} />) : null}
        </div>
    )
}

export default FormAlumno
