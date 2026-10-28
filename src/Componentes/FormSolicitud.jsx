import React, { useEffect, useState } from 'react'
import Constantes from '../Constantes';
import { Modal } from './Modal';
import instruct_pict from '/instruc_pict_alumno.png';
import useSolicitante from './Hooks/useSolicitante';

const FormSolicitud = ({ cerrar, setUser }) => {
    const { guardaUser, guardaSendSolicitud } = useSolicitante();

    const validaNotNewIngreso = (matricula) => {
        const prefix = matricula.substring(0, 3);
        console.log('Prefix de matrícula:', prefix);
        return prefix !== '271'; // true si NO es nuevo ingreso
    };

    const [response, setResponse] = useState(null);
    const [secondsRemaining, setSecondsRemaining] = useState(10);
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [dataSolicitud, setDataSolicitud] = useState({
        Matricula: '',
        Nombre: '',
        Carrera: '',
        F_pago: '',
        F_Solicitud: new Date().toISOString().split('T')[0],
        status: false
    });

    useEffect(() => {
        if (response?.status !== 'OK') return;

        setSecondsRemaining(10);
        const countdown = setInterval(() => {
            setSecondsRemaining((seconds) => Math.max(seconds - 1, 0));
        }, 1000);
        const closeModal = setTimeout(() => cerrar(false), 10000);

        return () => {
            clearInterval(countdown);
            clearTimeout(closeModal);
        };
    }, [response, cerrar]);
    const uploadPhoto = async (matricula) => {
        if (!photoFile) {
            return false;
        }

        const photo = photoFile;
        if (photo.size > 10 * 1024 * 1024) {
            return 'too-large';
        }

        // --- Limpieza y formateo seguro del nombre del archivo ---
        const extension = photo.name.split('.').pop() || 'jpg';
        let nombreLimpio = String(matricula).trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9_-]/g, "_");

        const finalFileName = `${nombreLimpio}_${Date.now()}.${extension}`;
        // --------------------------------------------------------

        const reader = new FileReader();

        return new Promise((resolve) => {
            reader.onload = async (e) => {
                const rawLog = e.target.result.split(',')[1]; // solo la parte base64

                const dataSend = {
                    fname: "uploadFilesToGoogleDrive",
                    dataReq: {
                        data: rawLog,
                        name: finalFileName, // Usamos el nombre limpio y seguro
                        type: photo.type
                    }
                };

                try {
                    const res = await fetch(Constantes.RUTA_UPLOAD_PHOTO, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'text/plain;charset=utf-8', // Vital para evitar conflictos de CORS en Google
                        },
                        body: JSON.stringify(dataSend)
                    });

                    let data;
                    try {
                        data = await res.json();
                        console.log("respuesta AppsScript:", data);
                    } catch (parseError) {
                        console.error("No se pudo leer la respuesta de Apps Script:", parseError);
                        resolve(false);
                        return;
                    }

                    resolve(data?.status === 'ok' && data?.success === true);
                } catch (error) {
                    console.error("Error al subir foto:", error);
                    resolve(false);
                } finally {
                    setPhotoUrl('');
                }
            };

            reader.onerror = () => {
                console.error("Error al leer la foto.");
                setPhotoUrl('');
                resolve(false);
            };

            reader.readAsDataURL(photo);
        });
    };

    const handleChange = (e) => {
        setDataSolicitud({
            ...dataSolicitud,
            [e.target.name]: (e.target.value).toUpperCase()
        });
        if (e.target.name === 'Matricula') {
            if (e.target.value.length === 9) {
                const isNotNewIngreso = validaNotNewIngreso(e.target.value);
                console.log('Es nuevo ingreso:', !isNotNewIngreso);
                if (!isNotNewIngreso) { // (!isNotNewIngreso) - Valida Renovaciones, NO es nuevo ingreso || (isNotNewIngreso) - Valida Nuevo Ingreso No es Renovacion
                    alert("La matricula ingresada  no corresponde a un alumno de RENOVACION. Actualmente solo se aceptan solicitudes de RENOVACION.");
                    setDataSolicitud({
                        ...dataSolicitud,
                        [e.target.name]: ''
                    });
                    cerrar(false);
                }
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(dataSolicitud);

        const solicitud = {
            ...dataSolicitud,
            status: true
        };

        if (!photoFile) {
            alert("Selecciona una foto del álbum o toma una con la cámara.");
            return;
        }

        setDataSolicitud(solicitud);
        setUser({
            matricula: solicitud.Matricula,
            nombre: solicitud.Nombre,
            carrera: solicitud.Carrera
        })
        const photoUploadResult = await uploadPhoto(`${solicitud.Matricula}_${solicitud.Nombre.replace(/\s+/g, '_')}`);
        if (photoUploadResult === 'too-large') {
            setDataSolicitud({ ...solicitud, status: false });
            alert("La foto no puede pesar más de 10 MB. Selecciona una imagen más pequeña.");
            return;
        }
        if (photoUploadResult !== true) {
            setDataSolicitud({ ...solicitud, status: false });
            alert("No se confirmó la subida de la foto. La solicitud no fue enviada.");
            return;
        }

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
            guardaUser({
                matricula: solicitud.Matricula,
                nombre: solicitud.Nombre,
                carrera: solicitud.Carrera,
                status: 'Por procesar',
            });
            setDataSolicitud({
                Matricula: '',
                Nombre: '',
                Carrera: '',
                F_pago: '',
                F_Solicitud: new Date().toISOString().split('T')[0],
                status: false
            });
            guardaSendSolicitud();
        }
    };

    const handlePhotoChange = (e) => {
        const photo = e.target.files?.[0] || null;

        if (!photo) {
            setPhotoFile(null);
            setPhotoUrl('');
            return;
        }

        if (photo.size > 10 * 1024 * 1024) {
            alert("La foto no puede pesar más de 10 MB. Selecciona una imagen más pequeña.");
            e.target.value = '';
            setPhotoFile(null);
            setPhotoUrl('');
            return;
        }

        setPhotoFile(photo);
        setPhotoUrl(URL.createObjectURL(photo));
    };

    useEffect(() => {
        return () => {
            if (photoUrl) URL.revokeObjectURL(photoUrl);
        };
    }, [photoUrl]);

    return (
        <div className='form-solicitud-container'>
            <div className='form-solicitud-wrapper'>
                <h2>Solicitud de Credencialización</h2>
                <legend>Datos Solicitante</legend>
                <form onSubmit={handleSubmit} className='form-login-alumno' id='formulario-alumno'>
                    <div className='input-group'>
                        <label>{`Matrícula (deben ser 9 dígitos)`}</label>
                        <input type="text" id='Matricula' name="Matricula" value={dataSolicitud.Matricula} required maxLength={9} minLength={9} onChange={handleChange} />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="nombre">Nombre Completo:</label>
                        <input type="text" id="Nombre" name="Nombre" value={dataSolicitud.Nombre} required onChange={handleChange} />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="">Carrera</label>
                        <input type="text" id='Carrera' name="Carrera" value={dataSolicitud.Carrera} required onChange={handleChange} />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="F_pago">Fecha Pago</label>
                        <input type="date" id='F_pago' name="F_pago" value={dataSolicitud.F_pago} required onChange={handleChange} />
                    </div>
                    <div className='cont-file-pict-form'>
                        <div className='input-group'>
                            <label>Foto del Alumno</label>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <label className='btn btn-login' style={{ cursor: 'pointer', margin: 0 }}>
                                    Subir del álbum
                                    <input
                                        type='file'
                                        name='FotoAlbum'
                                        id='FotoAlbum'
                                        accept='image/*'
                                        required={!photoFile}
                                        onChange={handlePhotoChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                <label className='btn btn-login' style={{ cursor: 'pointer', margin: 0 }}>
                                    Abrir cámara
                                    <input
                                        type='file'
                                        name='FotoCamara'
                                        id='FotoCamara'
                                        accept='image/*'
                                        capture='environment'
                                        required={!photoFile}
                                        onChange={handlePhotoChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                            {photoUrl && (
                                <img
                                    src={photoUrl}
                                    alt='Vista previa de la foto seleccionada'
                                    style={{ width: '180px', height: '180px', objectFit: 'cover', marginTop: '10px', borderRadius: '5px', border: '1px solid #999' }}
                                />
                            )}
                        </div>
                        <div className='input-group'>
                            <img src={instruct_pict} alt="indicaciones de foto alumnos" style={{ border: '1px solid red' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cac9c9', paddingTop: '5px', borderRadius: '5px' }}>
                        <span style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>**NOTA: Trata de que la foto sea cuadrada (formato 1:1 en la configuracion de tu camara), ademas de estar bien iluminada.</span>
                    </div>
                    <button className='btn btn-login' disabled={(dataSolicitud.status)}> {(dataSolicitud.status) ? 'Enviando espere..' : 'Solicitar'}</button>
                </form>
                {response && <p>{response.status}</p>}
                {response !== null && response.status === 'OK' && (
                    <Modal onClose={() => cerrar(false)}>
                        <div className='response-success'>
                            <h3>Solicitud Enviada Correctamente ✅</h3>
                            <p>Tu solicitud ha sido enviada con éxito. Nos pondremos en contacto contigo pronto.</p>
                            <p>También puedes revisar el status a través de esta página a partir de mañana</p>
                            <span>Este mensaje se cerrará automáticamente en {secondsRemaining} segundos.</span>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default FormSolicitud
