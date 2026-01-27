import React, { useState } from 'react'
import credenciales from '../files/credenciales'
import Notifs from './Notifs';
import { Modal } from './Modal';
import { motion } from "motion/react";


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
const NotifImpresa = () => (
    <div className='notif-impresa'>
        <span>{notifs.msgImpresa}</span>
        <span><b><u>{notifs.msg2Impresa}</u></b></span>
    </div>
);
const NotifGenerada = () => (
    <div className='notif-generada'>
        <span>{notifs.msgGenerada}</span>
        <span><b><u>{notifs.msg2Generada}</u></b></span>
    </div>
)
const EtiquetaGenerada = () => (
    <>
        <span>"EN TRAMITE" | La credencial aun no esta IMPRESA!!</span>
    </>
);
const CardMatch = ({ user }) => {
    const variants = {
        hidden: { opacity: 0 },
        visible: ({ delay }) => ({ opacity: 1, transition: { delay, duration: 1 } })
    };
    return (

        <div className='detail-credencial' >
            <span className='tittle-Matchcredencial'>Status de Credencial</span>
            <motion.div className='match-credencial' custom={{ delay: (0 + 0) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants}>
                <div>
                    <label>ALUMNO: </label>
                </div>
                <div className='values-data'>
                    <span>{user.NOMBRE} {user.PATERNO} {user.MATERNO}</span>
                </div>
            </motion.div>
            <motion.div className="match-credencial" custom={{ delay: (1 + 2) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants}>
                <div>
                    <label>{user.NIVEL}: </label>
                </div>
                <div className='values-data'>
                    <span>{user.carrera} | {user.modalidad}</span>
                </div>
            </motion.div>
            <motion.div className="match-credencial" custom={{ delay: (2 + 3) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants}>
                <div>
                    <label>Vigencia: </label>
                </div>
                <div className='values-data'>
                    <span>{calculaVigencia(user.vigencia)}</span>
                </div>
            </motion.div>
            <motion.div className="match-credencial" custom={{ delay: (3 + 4) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants}>
                <div>
                    <label>STATUS:</label>
                </div>
                <div className='values-data'>
                    <span>{(user.status === "GENERADA") ? <EtiquetaGenerada /> : user.status}</span>
                </div>
            </motion.div>
            <motion.div className='match-credencial' custom={{ delay: (4 + 5) * 0.3 }} initial='hidden' animate='visible' exit='hidden' variants={variants}>
                <div className='details-status'>
                    <span>{(user.status === "GENERADA") ? <NotifGenerada /> : (user.status === "IMPRESA") ? <NotifImpresa /> : `${notifs.msgEntregada}`}</span>
                </div>
            </motion.div>
        </div>
    )
}
const FormAlumno = () => {
    const [alumnos, setAlumnos] = useState(credenciales);
    const initialForm = { matricula: '' }
    const [inputs, setInputs] = useState(initialForm)
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState('')
    const [msj, setMsj] = useState('')
    const cerrarModal = () => {
        setIsLogin(false);
        setInputs({ matricula: '' })
    }
    const onChange = (e) => {// al detectar cambios en los inputs password y email se setean en cada uno
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
    const fetchDataAlumn = (matricula) => {
        if (matricula != '' && matricula.length === 9) {
            /*const url = `${Constantes.RUTA_API_GLOBAL}/api/credenciales/getCredencialAlumn/${matricula}`;
            const peticion = await fetch(url)
            const resp = await peticion.json()*/
            const foundUser = alumnos.find(credencial => credencial.MATRÍCULA === matricula);
            if (foundUser) {
                setUser(foundUser)
                setIsLogin(true)
                setMsj('')
            } else {
                alert(`🔸El alumno ${matricula} no existe o no ah tramitado, Contacte con Sistemas`);
                setUser('')
                setIsLogin(false)
                setMsj(`¡¡No existe trámite de credencialización para: ${matricula} o ya realizó el trámite y está entregada. Para más información, contacta a sistemas.!!`);
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
        <div className='form-login-search'>
            <fieldset>
                <legend>🔍 Seguimiento Credencialización</legend>
                <form className='form-login-alumno'>
                    <div>
                        <label htmlFor="matricula">📚 Matrícula:</label>
                    </div>
                    <div>
                        <input 
                            type="search" 
                            onChange={onChange} 
                            placeholder='Ej: 123456789' 
                            id='matricula' 
                            name='matricula' 
                            value={inputs.matricula}
                            maxLength={9}
                        />
                    </div>
                    <div>
                        <button onClick={getAccess} className='btn-login' type='button'>
                            🔎 Buscar
                        </button>
                    </div>
                </form>
            </fieldset>
            {isLogin ? (
                <Modal onClose={cerrarModal}>
                    <CardMatch
                        user={user}
                    />
                    <div className='option-modals'>
                        <button className='btn-login' onClick={cerrarModal}>Cerrar</button>
                    </div>
                </Modal>
            ) : (msj != '') ? (<Notifs msj={msj} />) : ''}
        </div>
    )
}

export default FormAlumno
