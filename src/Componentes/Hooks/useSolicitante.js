import { useEffect, useState } from 'react';
import credenciales from '../../files/credenciales'
import Constantes from '../../Constantes';

const useSolicitante = () => {
    const [user, setUser] = useState({ matricula: '', nombre: '', carrera: '', status: '' });
    const [matchedUser, setMatchedUser] = useState(false);
    /*const buscarSolicitante = (matricula) => {
        const solicitanteEncontrado = credenciales.find((alumno) => alumno.MATRÍCULA === matricula);
        if (solicitanteEncontrado) {
            console.log('Solicitante encontrado:', solicitanteEncontrado);
            setUser(
                {
                    matricula: solicitanteEncontrado.MATRÍCULA,
                    nombre: solicitanteEncontrado.NOMBRE+' '+solicitanteEncontrado. PATERNO+' '+solicitanteEncontrado.MATERNO,
                    carrera: solicitanteEncontrado.carrera,
                    status: solicitanteEncontrado.status,
                }
            );
            setMatchedUser(true);
        } 
    };*/
    const buscarSolicitante = async (matricula) => {
        const url = `${Constantes.RUTA_API_GLOBAL}/api/credenciales/getCredencialAlumn/${matricula}`;
        const peticion = await fetch(url)
        const resp = await peticion.json()

        if (resp.status !== 500) {
            if (resp.length > 0) {
                console.log('solicitante encontrado', resp[0])
                setUser({
                    matricula: resp[0].matricula,
                    nombre: resp[0].nombre + ' ' + resp[0].paterno + ' ' + resp[0].materno,
                    carrera: resp[0].carrera,
                    status: resp[0].status,
                })
                setMatchedUser(true)
            }
        }
    }
    useEffect(() => {
        buscarSolicitante(user.matricula);
    }, [user.status]);

    return {
        user,
        setUser,
        matchedUser,
    };
};

export default useSolicitante;