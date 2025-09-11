import React, { useState } from 'react'
import Constantes from '../Constantes';

const FormSolicitud = () => {
    const [response, setResponse] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const [dataSolicitud, setDataSolicitud ]= useState({
        Matricula: '',
        Nombre: '',
        Carrera: '',
        F_pago: '',
        F_Solicitud: new Date().toISOString().split('T')[0],
        status: false
    });
    const uploadPhoto = async (file) => {
        
    }
    const handleChange = (e) => {
        setDataSolicitud({
            ...dataSolicitud,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(dataSolicitud);

        const solicitud = {
            ...dataSolicitud,
            status: true
        };

        setDataSolicitud(solicitud);
        
        try {
            const url = `${Constantes.RUTA_GOOGLE_DRIVE}`;
            const payload = {
                fname: "pasteData", // nombre de la función en Apps Script
                dataReq: [solicitud] // debe ser un array de objetos
            };

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            setResponse(data);
            console.log(data);

        } catch (error) {
            console.error("Error al enviar datos:", error);
        } finally {
            setDataSolicitud({
                Matricula: '',
                Nombre: '',
                Carrera: '',
                F_pago: '',
                F_Solicitud: new Date().toISOString().split('T')[0],
                status: false
            });
        }
    };

  return (
    <div style={{margin: 0, padding:'auto', textAlign:'center'}}>
      <h2>Solicitud de Credencializacion</h2>
      <legend>Datos Solicitante</legend>
        <form onSubmit={handleSubmit} className='form-login-alumno' id='formulario-alumno'>
            <div className='input-group'>
                <label>{`Matricula (deben ser 9 digitos)`}</label>
                <input type="text" id='Matricula' name="Matricula" value={dataSolicitud.Matricula} required maxLength={9} minLength={9} onChange={handleChange}/>                    
            </div>
            <div className='input-group'>
                <label htmlFor="nombre">Nombre Completo:</label>
                <input type="text" id="Nombre" name="Nombre" value={dataSolicitud.Nombre} required onChange={handleChange}/>
            </div>
            <div className='input-group'>
                <label htmlFor="">Carrera</label>
                <input type="text" id='Carrera' name="Carrera" value={dataSolicitud.Carrera} required onChange={handleChange}/>
            </div>
            <div className='input-group'>
                <label htmlFor="F_pago">Fecha Pago</label>
                <input type="date" id='F_pago' name="F_pago" value={dataSolicitud.F_pago} required onChange={handleChange}/>
            </div>
            <div className='input-group'>
                <label htmlFor="Foto_Alumno">Foto</label>
                <input type="file" name="Foto" id="Foto" required/>
            </div>
            <button className='btn btn-login'>{(dataSolicitud.status)?'Enviando espere..':'Solicitar'}</button>
        </form>
        {response && <p>{response.status}</p>}
    </div>
  )
}

export default FormSolicitud
