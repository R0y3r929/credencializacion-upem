import React, { useState } from 'react'
import credenciales from '../files/credenciales'
import Constantes from '../Constantes';
import Notifs from './Notifs';
const calculaVigencia=function(fecha){
    const arrayMonth=["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const pDig=fecha.substring(0, 2);
    const digito=pDig-1;
    const ano=fecha.substring(2, 7);
    const mesLetra=arrayMonth[digito];
    return mesLetra+" de "+ano;
};
const FormAlumno = () => {
    const [alumnos, setAlumnos] = useState(credenciales);
    const initialForm = {matricula:''}
    const [inputs, setInputs]=useState(initialForm)
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState('')
    const [msj, setMsj] = useState('')
    const onChange=(e)=>{// al detectar cambios en los inputs password y email se setean en cada uno
        const {name, value} = e.target;
        if (e.target.type !== "file") {
            setInputs({
                ...inputs,
                [name]:value.toUpperCase()
            })   
        }else{
            setInputs({
                ...inputs,
                [name]:value
            }) 
        }      
    }
    const fetchDataAlumn = async (matricula) =>{
        if(matricula!= '' && matricula.length===9){
            const url = `${Constantes.RUTA_API_GLOBAL}/api/credenciales/getCredencialAlumn/${matricula}`;
            const peticion = await fetch(url)
            const resp = await peticion.json()
            if (Object.keys(resp).length > 0) {
                setUser(resp)
                setIsLogin(true)
                setMsj('')
            }else{
                alert(`🔸El alumno ${matricula} no existe o no ah tramitado, Contacte con Sistemas`);
                setUser('')
                setIsLogin(false)  
                setMsj(`No exite tramite de credencializacion para: ${matricula}`);  
            }
        }else{
            alert(`🚫 Proporciona alguna matricula valida (9 digitos) para poder buscar!!`)
        }
    }
    const getAccess = (e) =>{
        e.preventDefault()
        fetchDataAlumn(inputs.matricula)
    }
  return (
    <div className='form-login-search'>
      <fieldset>
        <legend>Ingresa tu Matricula</legend>
        <form className='form-login-alumno'>
            <div>
                <label htmlFor="matricula">Matricula:</label>
            </div>
            <div>
                <input type="search" onChange={onChange} placeholder='Matricula' id='matricula' name='matricula'/>                
            </div>
            <div>
                <button onClick={getAccess} className='btn-login'>Buscar</button>
            </div>
        </form>
      </fieldset>
        {isLogin ?(
            <div className='detail-credencial'>
                <div className='match-credencial'>
                    <div>
                        <label>ALUMNO: </label>
                    </div>
                    <div className='values-data'>
                        <span>{user[0].NOMBRE} {user[0].PATERNO} {user[0].MATERNO}</span>
                    </div>
                </div>
                <div className="match-credencial">
                    <div>
                        <label>{user[0].NIVEL}: </label>
                    </div>
                    <div className='values-data'>
                        <span>{user[0].carrera} | {user[0].modalidad}</span>
                    </div>
                </div>
                <div className="match-credencial">
                    <div>
                        <label>Vigencia: </label>
                    </div>
                    <div className='values-data'>
                        <span>{calculaVigencia(user[0].vigencia)}</span>
                    </div>
                </div>
                <div className="match-credencial">
                    <div>
                        <label>STATUS:</label> 
                    </div>
                    <div className='values-data'>
                        <span>{user[0].status}</span>
                    </div>
                </div>
                <div className='match-credencial'>
                    <div className='details-status'>
                        <span>{(user[0].status === "GENERADA")? ` 🔸La credencial ya se tramito pero aun no esta lista, (aun no se encuentra impresa) !!`: (user[0].status === "IMPRESA") ? `🟢 La credencial se encuentra impresa, ya puedes pasar a recoger no olvides llevar copia de tu recibo de pago  y pluma para firmar!!`: `✅ Esta credencial ya se Entrego`}</span>
                    </div>
                </div>
            </div>
        ): (msj!='')? (<Notifs msj={msj}/>):''}
    </div>
  )
}

export default FormAlumno
