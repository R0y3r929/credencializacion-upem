import React, { useState } from 'react'
import Constantes from '../Constantes';
import { Modal } from './Modal';

const FormSolicitud = ({cerrar}) => {
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
    const uploadPhoto = async (matricula) => {
        const fileList = document.getElementById('Foto').files;
        if (fileList.length === 0) {
            console.error("No se ha seleccionado ninguna foto.");
            return;
        }

        const photo = fileList[0];
        const reader = new FileReader();

        reader.onload = async function (e) {
            const rawLog = e.target.result.split(',')[1]; // solo la parte base64

            const dataSend = { 
            fname: "uploadFilesToGoogleDrive", // 👈 EXACTO como en tu switch
            dataReq: { 
                data: rawLog, 
                name: matricula, 
                type: photo.type 
            }
            };

            try {
            const res = await fetch(Constantes.RUTA_UPLOAD_PHOTO, {
                method: 'POST',
                body: JSON.stringify(dataSend)
            });

            const data = await res.json();
            console.log(data);

            } catch (error) {
                console.error("Error al subir foto:", error);
            } finally {
                setPhotoUrl('');
            }
        };

        reader.readAsDataURL(photo);
    };

    const handleChange = (e) => {
        setDataSolicitud({
            ...dataSolicitud,
            [e.target.name]: (e.target.value).toUpperCase()
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
        await uploadPhoto(solicitud.Matricula);
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
            setTimeout(() => {
                setResponse(null);
            }, 10000);
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
        {response!==null && response.status === 'OK' && (
            <Modal onClose={() => cerrar(false)}>
                <div className='response-success'>
                    <h3>Solicitud Enviada Correctamente ✅</h3>                    
                    <p style={{ color: 'GrayText', marginTop: '35px'}}>Tu solicitud ha sido enviada con éxito. Nos pondremos en contacto contigo pronto.</p>
                    <p style={{ color: 'GrayText'}}>Tambien puedes revisar el status a travez de esta pagina apartir de mañana</p>
                </div>
            </Modal>
        )}
    </div>
  )
}

export default FormSolicitud
